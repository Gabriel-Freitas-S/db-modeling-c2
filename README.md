# Guia Completo de Modelagem de Banco de Dados - SQLite + GitHub Pages

Este projeto apresenta uma análise exaustiva e implementação prática de modelagem de banco de dados para 10 cenários distintos, variando em complexidade. O objetivo é fornecer um guia completo que abrange desde a concepção teórica até a implementação concreta utilizando SQLite.

## 📋 Sobre o Projeto

Este repositório contém implementações práticas de modelagem de banco de dados, demonstrando padrões e melhores práticas através de 10 contextos diferentes. Cada contexto é cuidadosamente projetado para ensinar conceitos específicos de modelagem de dados, desde relacionamentos básicos até estruturas complexas.

## 🎯 Os 10 Contextos de Modelagem

| # | Contexto | Complexidade | Padrão Principal | Conceitos-Chave |
|---|----------|--------------|------------------|-----------------|
| 1 | **Biblioteca** | Baixa | Um-para-Muitos | Separação entre entidade abstrata e instância física |
| 2 | **Acadêmico** | Baixa | Muitos-para-Muitos | Tabelas de junção, relacionamentos N:M |
| 3 | **Clínica Médica** | Média | Um-para-Um | Relacionamento exclusivo entre entidades |
| 4 | **E-commerce** | Média | N:M com Atributos | Tabela de junção com dados próprios |
| 5 | **Rede Social** | Média | Múltiplos Relacionamentos | Várias formas de interação entre entidades |
| 6 | **RH** | Média | Histórico Temporal | Rastreamento de mudanças ao longo do tempo |
| 7 | **Locadora** | Alta | Ciclo de Vida | Gerenciamento de estados e transições |
| 8 | **Vendas** | Alta | Transações Complexas | Cálculos derivados e valores históricos |
| 9 | **Universidade** | Alta | Auto-relacionamento | Pré-requisitos e dependências recursivas |
| 10 | **Hospitalar** | Alta | Integração de Domínios | Sistema completo com múltiplos subsistemas |

## 🏗️ Estrutura do Projeto

```
projeto-pratico/
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
├── index.html              # Página principal do site
├── base.md                 # Documentação técnica completa
├── data/                   # Banco de dados SQLite
│   ├── biblioteca.sqlite3
│   ├── academico.sqlite3
│   ├── clinica.sqlite3
│   ├── ecommerce.sqlite3
│   ├── rede_social.sqlite3
│   ├── rh.sqlite3
│   ├── locadora.sqlite3
│   ├── vendas.sqlite3
│   ├── universidade.sqlite3
│   └── hospitalar.sqlite3
├── pagina/                 # Assets do front-end
│   ├── css/
│   │   └── style.css       # Estilos da página
│   ├── js/
│   │   ├── sql-wasm.js     # Biblioteca sql.js
│   │   └── main.js         # Lógica da aplicação
│   └── img/                # Diagramas MER e imagens
│       ├── mer_biblioteca.png
│       ├── mer_academico.png
│       └── ...
└── sql/                    # Scripts DDL
    ├── 1_biblioteca.sql
    ├── 2_academico.sql
    ├── 3_clinica.sql
    ├── 4_ecommerce.sql
    ├── 5_rede_social.sql
    ├── 6_rh.sql
    ├── 7_locadora.sql
    ├── 8_vendas.sql
    ├── 9_universidade.sql
    └── 10_hospitalar.sql
```

## 🚀 Tecnologias Utilizadas

- **SQLite**: Sistema de banco de dados relacional leve e embutido
- **sql.js**: Compilação do SQLite para WebAssembly, permitindo execução no navegador
- **HTML5**: Estrutura da página web
- **CSS3**: Estilização e layout responsivo
- **JavaScript (ES6+)**: Lógica de interação e manipulação do banco de dados
- **GitHub Pages**: Hospedagem estática gratuita

## 💻 Como Executar o Projeto

### Opção 1: Acessar Online (GitHub Pages)

1. Acesse o site hospedado no GitHub Pages:
   ```
   https://[seu-usuario].github.io/projeto-pratico/
   ```

### Opção 2: Executar Localmente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/[seu-usuario]/projeto-pratico.git
   cd projeto-pratico
   ```

2. **Inicie um servidor local**:
   
   Com Python 3:
   ```bash
   python -m http.server 8000
   ```
   
   Com Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Com PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Acesse no navegador**:
   ```
   http://localhost:8000
   ```

> ⚠️ **Importante**: É necessário usar um servidor local devido às restrições de CORS ao carregar arquivos SQLite. Abrir o arquivo `index.html` diretamente no navegador não funcionará.

## 📖 Como Usar

1. **Navegue pelos Contextos**: Selecione um dos 10 contextos disponíveis no menu principal
2. **Visualize o Diagrama MER**: Cada contexto apresenta seu diagrama Entidade-Relacionamento
3. **Explore o Código DDL**: Veja os scripts SQL que criam as tabelas
4. **Consulte os Dados**: Execute queries SQL diretamente no navegador
5. **Experimente**: Modifique consultas e explore os relacionamentos

## 🎓 Conceitos Aprendidos

Este projeto ensina:

- ✅ Modelagem conceitual de dados
- ✅ Normalização de banco de dados (1NF, 2NF, 3NF)
- ✅ Relacionamentos Um-para-Um, Um-para-Muitos e Muitos-para-Muitos
- ✅ Uso de chaves primárias e estrangeiras
- ✅ Constraints e integridade referencial
- ✅ Auto-relacionamentos e estruturas recursivas
- ✅ Modelagem temporal e histórico de dados
- ✅ Boas práticas de nomenclatura
- ✅ Diagramas ER (Entidade-Relacionamento)
- ✅ Implementação prática com SQLite

## 📚 Documentação

- **[base.md](base.md)**: Documentação técnica completa com análise detalhada de cada contexto
- Cada script SQL está comentado explicando as decisões de design
- Diagramas MER ilustram visualmente cada modelo

## 🤝 Como Contribuir

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

## 👥 Autor

Desenvolvido como projeto prático de estudo de modelagem de banco de dados.

## 🔗 Links Úteis

- [Documentação SQLite](https://www.sqlite.org/docs.html)
- [sql.js no GitHub](https://github.com/sql-js/sql.js)
- [Tutorial de Modelagem ER](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento)
- [Normalização de Banco de Dados](https://www.devmedia.com.br/normalizacao-de-dados-tutorial/19538)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!