/**
 * Sistema de Visualização de Modelagem de Banco de Dados
 * Exibe todos os 10 contextos com lazy loading de diagramas Mermaid
 */

// ============================================================================
// VARIÁVEIS GLOBAIS
// ============================================================================

const CONTEXTOS = window.CONTEXTOS_DATA || [];
let diagramObserver = null;

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializa a aplicação quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Iniciando aplicação...');
        renderizarTodosContextos();
        configurarNavegacao();
        inicializarLazyLoading();
        console.log('Aplicação iniciada com sucesso!');
    } catch (erro) {
        console.error('Erro na inicialização:', erro);
        mostrarErro('Erro ao inicializar a aplicação: ' + erro.message);
    }
});

// ============================================================================
// RENDERIZAÇÃO DE CONTEXTOS
// ============================================================================

/**
 * Renderiza todos os 10 contextos na página
 */
function renderizarTodosContextos() {
    const container = document.getElementById('contextos-container');
    
    if (!container) {
        throw new Error('Container de contextos não encontrado');
    }
    
    if (CONTEXTOS.length === 0) {
        container.innerHTML = '<div class="erro-container"><p>Nenhum contexto disponível</p></div>';
        return;
    }
    
    // Limpa loading inicial
    container.innerHTML = '';
    
    // Renderiza cada contexto
    CONTEXTOS.forEach((contexto, index) => {
        const contextoElement = criarElementoContexto(contexto, index);
        container.appendChild(contextoElement);
    });
    
    // Carrega SQL de todos os contextos automaticamente
    CONTEXTOS.forEach(contexto => {
        carregarSQL(contexto.sqlPath, `sql-${contexto.id}`);
    });
    
    console.log(`${CONTEXTOS.length} contextos renderizados`);
}

/**
 * Cria o elemento HTML completo para um contexto
 */
function criarElementoContexto(contexto, index) {
    const section = document.createElement('section');
    section.className = 'contexto-card';
    section.id = `contexto-${contexto.id}`;
    
    section.innerHTML = `
        <!-- Header do Contexto -->
        <div class="contexto-header">
            <div class="contexto-numero">${contexto.id}</div>
            <div class="contexto-info">
                <h2 class="contexto-titulo">${contexto.nome}</h2>
                <div class="contexto-meta">
                    <span class="badge badge-${getComplexidadeClass(contexto.complexidade)}">${contexto.complexidade}</span>
                    <span class="badge badge-info">${contexto.entidades.length} ${contexto.entidades.length === 1 ? 'tabela' : 'tabelas'}</span>
                </div>
                <p class="contexto-descricao">${contexto.descricao}</p>
            </div>
        </div>

        <!-- Padrões Aplicados -->
        <div class="contexto-padroes">
            <h3>🎯 Padrões e Conceitos Aplicados</h3>
            <ul class="lista-padroes">
                ${contexto.padroes.map(padrao => `<li>${padrao}</li>`).join('')}
            </ul>
        </div>

        <!-- Entidades e Atributos -->
        <div class="contexto-entidades">
            <h3>📋 Entidades e Atributos</h3>
            <div class="container-entidades">
                ${renderizarEntidades(contexto.entidades)}
            </div>
        </div>

        <!-- Diagrama MER -->
        <div class="contexto-diagrama">
            <h3>🗺️ Diagrama MER (Modelo Entidade-Relacionamento)</h3>
            <div class="diagrama-wrapper">
                <div class="diagrama-placeholder" data-contexto-id="${contexto.id}">
                    <div class="loading-diagrama">
                        <div class="loading-spinner"></div>
                        <p>Carregando diagrama...</p>
                    </div>
                    <div class="mermaid-container" style="display: none;" data-mermaid-code="${escapeHtml(contexto.diagramaMermaid)}">
                        ${contexto.diagramaMermaid}
                    </div>
                </div>
            </div>
        </div>

        <!-- Relacionamentos -->
        <div class="contexto-relacionamentos">
            <h3>🔗 Relacionamentos e Cardinalidades</h3>
            <div class="lista-relacionamentos">
                ${renderizarRelacionamentos(contexto.relacionamentos)}
            </div>
        </div>

        <!-- SQL DDL -->
        <div class="contexto-sql">
            <div class="sql-display-header">
                <h3>💾 SQL DDL (CREATE TABLE)</h3>
                <button class="btn btn-primary btn-copiar copy-sql-btn" data-sql-path="${contexto.sqlPath}">
                    📋 Copiar SQL
                </button>
            </div>
            <div id="sql-${contexto.id}" class="sql-content">
                <div class="sql-loading">Carregando SQL...</div>
            </div>
        </div>
    `;
    
    return section;
}

/**
 * Renderiza as entidades de um contexto
 */
function renderizarEntidades(entidades) {
    return entidades.map(entidade => `
        <div class="entidade-card">
            <h4 class="entidade-titulo">${entidade.nome}</h4>
            <table class="tabela-atributos">
                <thead>
                    <tr>
                        <th>Atributo</th>
                        <th>Tipo</th>
                        <th>Restrições</th>
                    </tr>
                </thead>
                <tbody>
                    ${entidade.atributos.map(attr => `
                        <tr>
                            <td class="attr-nome">${attr.nome}</td>
                            <td class="attr-tipo">${attr.tipo}</td>
                            <td class="attr-restricoes">
                                ${attr.pk ? '<span class="badge badge-warning">PK</span>' : ''}
                                ${attr.fk ? '<span class="badge badge-info">FK</span>' : ''}
                                ${attr.notNull ? '<span class="badge badge-error">NOT NULL</span>' : ''}
                                ${attr.unique ? '<span class="badge badge-success">UNIQUE</span>' : ''}
                                ${attr.autoIncrement ? '<span class="badge badge-primary">AUTO</span>' : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `).join('');
}

/**
 * Renderiza os relacionamentos de um contexto
 */
function renderizarRelacionamentos(relacionamentos) {
    return relacionamentos.map(rel => `
        <div class="relacionamento-card">
            <div class="rel-header">
                <div class="rel-entidades">
                    <span class="entidade-badge">${rel.de}</span>
                    <span class="rel-tipo">${rel.tipo}</span>
                    <span class="entidade-badge">${rel.para}</span>
                </div>
            </div>
            <p class="rel-descricao">${rel.descricao}</p>
        </div>
    `).join('');
}

// ============================================================================
// LAZY LOADING DE DIAGRAMAS MERMAID
// ============================================================================

/**
 * Inicializa o Intersection Observer para lazy loading
 */
function inicializarLazyLoading() {
    const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
    };
    
    diagramObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const placeholder = entry.target;
                renderizarDiagramaMermaid(placeholder);
                diagramObserver.unobserve(placeholder);
            }
        });
    }, options);
    
    // Observa todos os placeholders de diagramas
    document.querySelectorAll('.diagrama-placeholder').forEach(placeholder => {
        diagramObserver.observe(placeholder);
    });
    
    console.log('Lazy loading configurado para diagramas');
}

/**
 * Renderiza um diagrama Mermaid específico
 */
async function renderizarDiagramaMermaid(placeholder) {
    try {
        const container = placeholder.querySelector('.mermaid-container');
        const loadingDiv = placeholder.querySelector('.loading-diagrama');
        
        if (!container) return;
        
        // Mostra container e esconde loading
        container.style.display = 'block';
        loadingDiv.style.display = 'none';
        
        // Renderiza o diagrama Mermaid
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        container.id = id;
        
        await mermaid.run({
            nodes: [container]
        });
        
        console.log('Diagrama renderizado:', placeholder.dataset.contextoId);
        
    } catch (erro) {
        console.error('Erro ao renderizar diagrama:', erro);
        const loadingDiv = placeholder.querySelector('.loading-diagrama');
        loadingDiv.innerHTML = '<p class="texto-erro">❌ Erro ao carregar diagrama</p>';
    }
}

// ============================================================================
// NAVEGAÇÃO
// ============================================================================

/**
 * Configura a navegação entre contextos
 */
function configurarNavegacao() {
    const navLinks = document.getElementById('nav-links');
    
    if (!navLinks) return;
    
    // Cria links de navegação
    CONTEXTOS.forEach(contexto => {
        const link = document.createElement('a');
        link.href = `#contexto-${contexto.id}`;
        link.className = 'nav-link';
        link.textContent = `${contexto.id}. ${contexto.nome}`;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContexto(contexto.id);
        });
        navLinks.appendChild(link);
    });
}

/**
 * Faz scroll suave até um contexto específico
 */
function scrollToContexto(contextoId) {
    const element = document.getElementById(`contexto-${contextoId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================================================
// FUNCIONALIDADES DE SQL
// ============================================================================

/**
 * Carrega e exibe o SQL de um contexto
 */
async function carregarSQL(sqlPath, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error('Container não encontrado:', containerId);
        return;
    }
    
    try {
        // Extrai o ID do contexto do containerId (formato: sql-1, sql-2, etc)
        const contextoId = parseInt(containerId.replace('sql-', ''));
        
        // Busca o contexto correspondente
        const contexto = CONTEXTOS.find(c => c.id === contextoId);
        
        if (!contexto) {
            throw new Error('Contexto não encontrado');
        }
        
        // Usa o conteúdo SQL embutido se disponível, senão tenta fetch
        let conteudo = contexto.sqlContent;
        
        if (!conteudo) {
            console.log('SQL embutido não encontrado, tentando carregar de:', sqlPath);
            const resposta = await fetch(sqlPath);
            
            if (!resposta.ok) {
                throw new Error(`Não foi possível carregar o SQL. Erro HTTP ${resposta.status}: ${resposta.statusText}`);
            }
            
            conteudo = await resposta.text();
        }
        
        if (!conteudo || !conteudo.trim()) {
            throw new Error('Conteúdo SQL vazio');
        }
        
        // Cria elemento de código com classe language-sql para Prism.js
        const codeElement = document.createElement('code');
        codeElement.className = 'language-sql';
        codeElement.textContent = conteudo;
        
        const preElement = document.createElement('pre');
        preElement.appendChild(codeElement);
        
        const displayDiv = document.createElement('div');
        displayDiv.className = 'sql-display';
        displayDiv.appendChild(preElement);
        
        container.innerHTML = '';
        container.appendChild(displayDiv);
        
        // Aplica syntax highlighting com Prism
        Prism.highlightElement(codeElement);
        
        console.log('SQL carregado com sucesso para contexto:', contextoId);
        
    } catch (erro) {
        console.error('Erro ao carregar SQL:', erro);
        container.innerHTML = `
            <div class="alert alert-error">
                <p><strong>❌ Erro ao carregar SQL:</strong> ${erro.message}</p>
                <p><small>Caminho: ${sqlPath}</small></p>
                <p><small>💡 Dica: O SQL está embutido na aplicação e deve funcionar sem necessidade de servidor.</small></p>
            </div>
        `;
    }
}

/**
 * Copia o SQL para a área de transferência com feedback visual
 * Implementa UX melhorada com:
 * - Mudança temporária do texto do botão
 * - Aplicação de classe CSS para feedback visual
 * - Mensagem flutuante de confirmação
 *
 * @param {string} sqlPath - Caminho do arquivo SQL a ser copiado
 */
async function copiarSQL(sqlPath) {
    // Encontra o botão que foi clicado
    const botao = document.querySelector(`[data-sql-path="${sqlPath}"]`);
    
    try {
        // Extrai o ID do contexto do sqlPath (formato: sql/1_biblioteca.sql)
        const match = sqlPath.match(/\/(\d+)_/);
        if (!match) {
            throw new Error('Não foi possível identificar o contexto');
        }
        
        const contextoId = parseInt(match[1]);
        const contexto = CONTEXTOS.find(c => c.id === contextoId);
        
        if (!contexto) {
            throw new Error('Contexto não encontrado');
        }
        
        // Usa o conteúdo SQL embutido se disponível
        let conteudo = contexto.sqlContent;
        
        if (!conteudo) {
            // Fallback: tenta fazer fetch
            const resposta = await fetch(sqlPath);
            conteudo = await resposta.text();
        }
        
        if (!conteudo || !conteudo.trim()) {
            throw new Error('Conteúdo SQL vazio');
        }
        
        await navigator.clipboard.writeText(conteudo);
        
        // Feedback visual no botão
        if (botao) {
            const textoOriginal = botao.textContent;
            botao.textContent = 'Copiado!';
            botao.classList.add('btn-copiado');
            
            setTimeout(() => {
                botao.textContent = textoOriginal;
                botao.classList.remove('btn-copiado');
            }, 2000);
        }
        
        mostrarMensagem('✅ SQL copiado para a área de transferência!', 'sucesso');
        
    } catch (erro) {
        console.error('Erro ao copiar SQL:', erro);
        mostrarMensagem('❌ Erro ao copiar SQL: ' + erro.message, 'erro');
    }
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

/**
 * Configura event listeners usando event delegation
 */
document.addEventListener('click', (e) => {
    // Botão de copiar SQL
    if (e.target.closest('.btn-copiar')) {
        const btn = e.target.closest('.btn-copiar');
        const sqlPath = btn.dataset.sqlPath;
        copiarSQL(sqlPath);
    }
});

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

/**
 * Retorna a classe CSS baseada na complexidade
 */
function getComplexidadeClass(complexidade) {
    const classes = {
        'Baixa': 'success',
        'Média': 'warning',
        'Alta': 'error'
    };
    return classes[complexidade] || 'info';
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Mostra mensagem temporária para o usuário
 */
function mostrarMensagem(texto, tipo = 'info') {
    const mensagem = document.createElement('div');
    mensagem.className = `alert alert-${tipo} mensagem-flutuante`;
    mensagem.textContent = texto;
    mensagem.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.style.opacity = '0';
        mensagem.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(mensagem);
        }, 300);
    }, 3000);
}

/**
 * Mostra erro na interface
 */
function mostrarErro(mensagem) {
    const container = document.getElementById('contextos-container');
    if (container) {
        container.innerHTML = `
            <div class="erro-container">
                <h2>❌ Erro</h2>
                <p>${mensagem}</p>
            </div>
        `;
    }
}

// ============================================================================
// BOTÃO VOLTAR AO TOPO
// ============================================================================

/**
 * Controla a visibilidade do botão "Voltar ao Topo"
 * O botão aparece automaticamente após scroll de 300px
 * Melhora a navegação em páginas longas com múltiplos contextos
 */
window.addEventListener('scroll', () => {
    const botaoVoltar = document.getElementById('voltarTopo');
    
    if (!botaoVoltar) return;
    
    if (window.scrollY > 300) {
        botaoVoltar.classList.add('visivel');
    } else {
        botaoVoltar.classList.remove('visivel');
    }
});

/**
 * Executa o scroll suave ao topo quando o botão for clicado
 * Implementa UX melhorada com animação smooth scroll
 * Facilita o retorno ao início da página após visualizar contextos
 */
document.addEventListener('DOMContentLoaded', () => {
    const botaoVoltar = document.getElementById('voltarTopo');
    
    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// ============================================================================
// CONSOLE LOG
// ============================================================================

console.log('main.js carregado - Modo: Visualização de Contextos');
console.log(`Total de contextos disponíveis: ${CONTEXTOS.length}`);