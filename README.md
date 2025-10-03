# 📚 DB Modeling C2 - Banco de Dados e Big Data

![Atividade C2](https://img.shields.io/badge/Atividade-C2%20(2%20pontos)-brightgreen.svg)
![Individual ou Dupla](https://img.shields.io/badge/Modalidade-Individual%20ou%20Dupla-blue.svg)
![SQLite](https://img.shields.io/badge/SQLite-3.x-blue.svg)
![Python](https://img.shields.io/badge/Python-3.x-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-orange.svg)

## 🎓 Atividade Prática C2 - Modelagem de Banco de Dados

Este projeto corresponde à **Atividade Prática C2** da disciplina de Modelagem de Banco de Dados.

## 📖 Visão Geral

Este é um projeto educacional completo de modelagem de banco de dados que apresenta **10 contextos práticos** de sistemas de informação, variando em complexidade desde sistemas básicos até arquiteturas empresariais complexas. O projeto inclui diagramas MER (Modelo Entidade-Relacionamento), scripts SQL funcionais e uma interface web interativa para visualização e aprendizado.


### 🎯 Objetivos da Atividade C2

- 🎓 **Desenvolver** habilidades práticas de modelagem de banco de dados
- 💡 **Aplicar** conceitos de entidades, atributos e relacionamentos
- 🔍 **Criar** diagramas MER com cardinalidades corretas (1:N, N:M)
- 🚀 **Implementar** modelos através de comandos SQL DDL
- 📊 **Compreender** a progressão de complexidade em sistemas reais

### 📋 Tarefas Obrigatórias para Cada Contexto

Para cada contexto escolhido, você deve:

1. ✅ **Listar entidades e atributos** - Identificar todas as entidades do sistema e seus respectivos atributos com tipos de dados básicos (VARCHAR, INTEGER, DATE, etc.)

2. ✅ **Criar Diagrama MER** - Desenvolver o Modelo Entidade-Relacionamento identificando:
   - Todas as entidades e seus atributos
   - Relacionamentos entre entidades
   - Cardinalidades corretas (1:1, 1:N, N:M)
   - Chaves primárias e estrangeiras

3. ✅ **Escrever Scripts SQL DDL** - Implementar o modelo através de comandos `CREATE TABLE` com:
   - Definição completa de todas as tabelas
   - Constraints de integridade (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK)
   - Relacionamentos implementados corretamente

---

## 📂 Estrutura do Projeto

```
db-modeling-c2/
├── 📄 index.html              # Página web principal
├── 📄 README.md               # Este arquivo
├── 📄 criar_bancos.py         # Script para criar bancos SQLite
├── 📄 .gitignore              # Arquivos ignorados pelo Git
│
├── 📁 diagramas/              # Diagramas MER em Markdown
│   ├── mer_1_biblioteca.md
│   ├── mer_2_academico.md
│   ├── mer_3_clinica.md
│   ├── mer_4_ecommerce.md
│   ├── mer_5_rede_social.md
│   ├── mer_6_rh.md
│   ├── mer_7_locadora.md
│   ├── mer_8_vendas.md
│   ├── mer_9_universidade.md
│   └── mer_10_hospitalar.md
│
├── 📁 sql/                    # Scripts SQL (DDL)
│   ├── 1_biblioteca.sql
│   ├── 2_academico.sql
│   ├── 3_clinica.sql
│   ├── 4_ecommerce.sql
│   ├── 5_rede_social.sql
│   ├── 6_rh.sql
│   ├── 7_locadora.sql
│   ├── 8_vendas.sql
│   ├── 9_universidade.sql
│   └── 10_hospitalar.sql
│
├── 📁 data/                  # Bancos de dados SQLite (gerados)
│   ├── 1_biblioteca.sqlite3
│   ├── 2_academico.sqlite3
│   ├── 3_clinica.sqlite3
│   ├── 4_ecommerce.sqlite3
│   ├── 5_rede_social.sqlite3
│   ├── 6_rh.sqlite3
│   ├── 7_locadora.sqlite3
│   ├── 8_vendas.sqlite3
│   ├── 9_universidade.sqlite3
│   └── 10_hospitalar.sqlite3
│
└── 📁 pagina/                 # Assets do front-end
    ├── 📁 css/
    │   └── style.css          # Estilos da interface
    └── 📁 js/
        ├── main.js            # Lógica da aplicação
        └── contextos-data.js  # Dados dos contextos
```

---

## 🎯 Os 10 Contextos de Modelagem

| # | Contexto |
|---|----------|
| **1** | [**Biblioteca**](#1-sistema-básico-de-biblioteca) |
| **2** | [**Acadêmico**](#2-controle-acadêmico-simplificado) |
| **3** | [**Clínica Médica**](#3-clínica-médica) |
| **4** | [**E-commerce**](#4-e-commerce-básico) |
| **5** | [**Rede Social**](#5-rede-social-de-fotos) |
| **6** | [**RH**](#6-sistema-de-rh) |
| **7** | [**Locadora**](#7-locadora-de-veículos) |
| **8** | [**Vendas**](#8-sistema-de-vendas-com-vários-vendedores) |
| **9** | [**Universidade**](#9-sistema-de-matrícula-em-universidade) |
| **10** | [**Hospitalar**](#10-sistema-hospitalar-completo) |

---

## 📋 Detalhamento dos Contextos

### 1. Sistema Básico de Biblioteca
**Arquivos:** [`diagramas/mer_1_biblioteca.md`](diagramas/mer_1_biblioteca.md) | [`sql/1_biblioteca.sql`](sql/1_biblioteca.sql)

**📌 Enunciado:**
Uma biblioteca precisa controlar seus livros e empréstimos. Cada livro tem um código ISBN único, título, autor, editora e ano de publicação. A biblioteca pode ter vários exemplares físicos do mesmo livro. Os usuários da biblioteca possuem nome, CPF, endereço e telefone. O sistema deve registrar os empréstimos, incluindo data de empréstimo, data prevista de devolução e data efetiva de devolução.

**Entidades Principais:**
- `Livros` - Informações bibliográficas (ISBN, título, autor, editora, ano)
- `Exemplares` - Cópias físicas individuais de cada livro
- `Usuarios` - Membros da biblioteca (nome, CPF, endereço, telefone)
- `Emprestimos` - Registro de transações (datas de empréstimo e devolução)

---

### 2. Controle Acadêmico Simplificado
**Arquivos:** [`diagramas/mer_2_academico.md`](diagramas/mer_2_academico.md) | [`sql/2_academico.sql`](sql/2_academico.sql)

**📌 Enunciado:**
Uma escola deseja controlar seus alunos, professores e disciplinas. Alunos possuem matrícula, nome, data de nascimento e turma. Professores têm registro funcional, nome, especialização e data de contratação. Disciplinas têm código, nome e carga horária. Um professor pode lecionar várias disciplinas, e uma disciplina pode ser lecionada por vários professores. Alunos podem se matricular em várias disciplinas, e cada disciplina pode ter vários alunos matriculados.

**Entidades Principais:**
- `Alunos` - Estudantes matriculados (matrícula, nome, data nascimento, turma)
- `Professores` - Corpo docente (registro, nome, especialização, data contratação)
- `Disciplinas` - Matérias ofertadas (código, nome, carga horária)
- `ProfessorDisciplina` - Tabela de junção (quem leciona o quê)
- `Matriculas` - Tabela de junção (quem cursa o quê)

---

### 3. Clínica Médica
**Arquivos:** [`diagramas/mer_3_clinica.md`](diagramas/mer_3_clinica.md) | [`sql/3_clinica.sql`](sql/3_clinica.sql)

**📌 Enunciado:**
Uma clínica médica precisa gerenciar seus médicos, pacientes e consultas. Médicos possuem CRM, nome, especialidade e telefone. Pacientes têm CPF, nome, data de nascimento, endereço e telefone. Cada consulta é realizada por um médico para um paciente em uma data/hora específica. Cada consulta gera obrigatoriamente um prontuário único com as observações médicas, diagnóstico e prescrição.

**Entidades Principais:**
- `Medicos` - Profissionais de saúde (CRM, nome, especialidade, telefone)
- `Pacientes` - Pessoas atendidas (CPF, nome, data nascimento, endereço, telefone)
- `Consultas` - Atendimentos realizados (data, hora, médico, paciente)
- `Prontuarios` - Registros médicos detalhados (observações, diagnóstico, prescrição)

---

### 4. E-commerce Básico
**Arquivos:** [`diagramas/mer_4_ecommerce.md`](diagramas/mer_4_ecommerce.md) | [`sql/4_ecommerce.sql`](sql/4_ecommerce.sql)

**📌 Enunciado:**
Uma loja virtual precisa controlar clientes, produtos e pedidos. Clientes possuem CPF, nome, email, endereço e telefone. Produtos têm código, nome, descrição, preço e quantidade em estoque. Um pedido é feito por um cliente em uma data específica e pode conter vários produtos. Para cada produto em um pedido, deve-se registrar a quantidade comprada e o preço unitário no momento da compra (que pode ser diferente do preço atual).

**Entidades Principais:**
- `Clientes` - Compradores cadastrados (CPF, nome, email, endereço, telefone)
- `Produtos` - Catálogo de produtos (código, nome, descrição, preço, estoque)
- `Pedidos` - Ordens de compra (data, cliente, status)
- `PedidoItens` - Detalhamento dos produtos em cada pedido (quantidade, preço no momento)

---

### 5. Rede Social de Fotos
**Arquivos:** [`diagramas/mer_5_rede_social.md`](diagramas/mer_5_rede_social.md) | [`sql/5_rede_social.sql`](sql/5_rede_social.sql)

**📌 Enunciado:**
Uma rede social permite que usuários publiquem álbuns de fotos. Usuários têm username (único), nome, email e data de cadastro. Cada álbum pertence a um usuário, tem título, descrição e data de criação. Álbuns contêm várias fotos, cada uma com título, caminho do arquivo e data de upload. Usuários podem comentar nas fotos (com texto e data/hora) e curtir fotos. O sistema deve registrar quem comentou/curtiu e quando.

**Entidades Principais:**
- `Usuarios` - Membros da rede social (username, nome, email, data cadastro)
- `Albuns` - Coleções de fotos (título, descrição, data criação)
- `Fotos` - Imagens publicadas (título, caminho, data upload)
- `Comentarios` - Interações textuais (texto, data/hora)
- `Curtidas` - Interações de aprovação (data/hora)

---

### 6. Sistema de RH
**Arquivos:** [`diagramas/mer_6_rh.md`](diagramas/mer_6_rh.md) | [`sql/6_rh.sql`](sql/6_rh.sql)

**📌 Enunciado:**
Uma empresa precisa gerenciar funcionários, departamentos e cargos. Funcionários têm matrícula, nome, CPF e data de admissão. Departamentos têm código, nome e localização. Cargos possuem código, título e salário base. Funcionários podem mudar de cargo e/ou departamento ao longo do tempo. O sistema deve manter histórico completo, registrando em que período cada funcionário ocupou determinado cargo em cada departamento.

**Entidades Principais:**
- `Funcionarios` - Colaboradores da empresa (matrícula, nome, CPF, data admissão)
- `Departamentos` - Setores organizacionais (código, nome, localização)
- `Cargos` - Funções e salários (código, título, salário base)
- `HistoricoAlocacoes` - Registro temporal (funcionário, cargo, departamento, período)

---

### 7. Locadora de Veículos
**Arquivos:** [`diagramas/mer_7_locadora.md`](diagramas/mer_7_locadora.md) | [`sql/7_locadora.sql`](sql/7_locadora.sql)

**📌 Enunciado:**
Uma locadora de veículos gerencia clientes, veículos, reservas, locações e manutenções. Clientes têm CNH, nome, telefone e email. Veículos possuem placa, modelo, marca, ano, cor, quilometragem e valor da diária. Clientes podem fazer reservas (data início/fim desejada) que depois se tornam locações efetivas. Locações registram datas de retirada e devolução reais, quilometragem inicial/final e valor total. Veículos passam por manutenções periódicas que devem ser registradas.

**Entidades Principais:**
- `Clientes` - Locatários (CNH, nome, telefone, email)
- `Veiculos` - Frota disponível (placa, modelo, marca, ano, cor, km, diária)
- `Reservas` - Agendamentos futuros (data início/fim desejada)
- `Locacoes` - Aluguéis concretizados (retirada/devolução real, km inicial/final, valor total)
- `Manutencoes` - Histórico de manutenção (data, tipo, custo, descrição)

---

### 8. Sistema de Vendas com Vários Vendedores
**Arquivos:** [`diagramas/mer_8_vendas.md`](diagramas/mer_8_vendas.md) | [`sql/8_vendas.sql`](sql/8_vendas.sql)

**📌 Enunciado:**
Uma empresa com equipe de vendedores precisa controlar vendas e comissões. Vendedores têm matrícula, nome, percentual de comissão e meta mensal. Clientes possuem código, nome, CNPJ, limite de crédito e saldo devedor. Produtos têm código, nome, preço e estoque. Cada venda é realizada por um vendedor para um cliente em uma data específica, contém vários produtos, e calcula-se a comissão do vendedor. O sistema deve guardar preço e comissão do momento da venda.

**Entidades Principais:**
- `Vendedores` - Equipe de vendas (matrícula, nome, % comissão, meta mensal)
- `Clientes` - Compradores (código, nome, CNPJ, limite crédito, saldo devedor)
- `Produtos` - Itens comercializados (código, nome, preço, estoque)
- `Vendas` - Transações (data, vendedor, cliente, valor total, comissão)
- `VendaItens` - Detalhamento (produto, quantidade, preço unitário)

---

### 9. Sistema de Matrícula em Universidade
**Arquivos:** [`diagramas/mer_9_universidade.md`](diagramas/mer_9_universidade.md) | [`sql/9_universidade.sql`](sql/9_universidade.sql)

**📌 Enunciado:**
Uma universidade oferece vários cursos de graduação. Cursos têm código, nome e duração em semestres. Cada curso possui um currículo com várias disciplinas obrigatórias. Disciplinas têm código, nome, carga horária e podem ter pré-requisitos (outras disciplinas que devem ser cursadas antes). Alunos se matriculam em disciplinas a cada semestre. Professores lecionam disciplinas. O sistema deve registrar as notas dos alunos em cada disciplina cursada.

**Entidades Principais:**
- `Alunos` - Estudantes universitários (matrícula, nome, curso, data ingresso)
- `Professores` - Corpo docente (registro, nome, titulação, área)
- `Cursos` - Programas de graduação (código, nome, duração semestres)
- `Disciplinas` - Matérias do currículo (código, nome, carga horária)
- `Prerequisitos` - Dependências entre disciplinas (auto-relacionamento)
- `CursoDisciplina` - Composição curricular (quais disciplinas em cada curso)
- `Matriculas` - Inscrições (aluno, disciplina, semestre, ano, nota, status)

---

### 10. Sistema Hospitalar Completo
**Arquivos:** [`diagramas/mer_10_hospitalar.md`](diagramas/mer_10_hospitalar.md) | [`sql/10_hospitalar.sql`](sql/10_hospitalar.sql)

**📌 Enunciado:**
Um hospital precisa integrar ambulatório, internação e laboratório. Pacientes são atendidos em consultas ambulatoriais por médicos. Quando necessário, pacientes são internados em leitos específicos de quartos. Durante consultas ou internações, podem ser solicitados exames laboratoriais. O hospital tem quartos (número, andar, tipo) com vários leitos cada. Médicos têm especialidades. Exames têm tipo, data/hora de solicitação e resultado. O sistema deve rastrear todo o fluxo: consulta → possível internação → possíveis exames.

**Entidades Principais:**
- `Pacientes` - Pessoas atendidas (código, nome, CPF, data nascimento, telefone)
- `Medicos` - Profissionais médicos (CRM, nome, especialidade)
- `Quartos` - Acomodações hospitalares (número, andar, tipo)
- `Leitos` - Leitos individuais (número, quarto, disponível)
- `Consultas` - Atendimentos ambulatoriais (data/hora, médico, paciente, observações)
- `Internacoes` - Internações hospitalares (data entrada/saída, leito, motivo)
- `Exames` - Procedimentos diagnósticos (tipo, data solicitação, resultado, origem)

---

## 🛠️ Ferramentas de Apoio

### Ferramentas Obrigatórias/Recomendadas

#### Para Diagramação
- **[Draw.io](https://app.diagrams.net/)** - Ferramenta gratuita online/desktop para criar diagramas MER
  - Versão online disponível sem necessidade de instalação
  - Suporte completo para diagramas Entidade-Relacionamento
  - Exportação em múltiplos formatos (PNG, PDF, XML)

#### Para Gerenciamento de Banco de Dados
- **[DBeaver Portable](https://dbeaver.io/download/)** - Cliente universal de banco de dados
  - Versão portátil não requer instalação
  - Suporte a SQLite e múltiplos SGBDs
  - Interface gráfica intuitiva para visualizar estruturas e executar queries
  - Geração automática de diagramas ER a partir do banco

### Tecnologias do Projeto

#### Backend/Database
- **SQLite 3.x** - Sistema de banco de dados relacional leve e embutido
- **Python 3.x** - Script de automação para criação dos bancos

#### Frontend
- **HTML5** - Estrutura semântica da página
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (ES6+)** - Lógica de interação

#### Bibliotecas
- **[Mermaid.js](https://mermaid.js.org/)** - Renderização de diagramas ER
- **[Prism.js](https://prismjs.com/)** - Syntax highlighting para SQL

---

## 💻 Como Usar o Projeto

### Opção 1: Visualizar a Interface Web

#### Online (GitHub Pages)
Se o projeto estiver hospedado, acesse:
```
https://[seu-usuario].github.io/db-modeling-c2/
```

#### Localmente
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/[seu-usuario]/db-modeling-c2.git
   cd db-modeling-c2
   ```

2. **Inicie um servidor HTTP local:**

   Com Python 3:
   ```bash
   python -m http.server 8000
   ```

   Com Node.js:
   ```bash
   npx http-server -p 8000
   ```

   Com PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Abra no navegador:**
   ```
   http://localhost:8000
   ```

> ⚠️ **Importante:** É necessário usar um servidor HTTP local. Abrir o arquivo `index.html` diretamente não funcionará devido às restrições de CORS.

---

### Opção 2: Explorar os Diagramas MER

Os diagramas estão em formato Markdown com sintaxe Mermaid na pasta [`diagramas/`](diagramas/):

```bash
# Visualize qualquer diagrama
cat diagramas/mer_1_biblioteca.md
```

Para renderizar os diagramas, use:
- [Mermaid Live Editor](https://mermaid.live/)
- Extensões de Markdown que suportam Mermaid
- A interface web do projeto

---

### Opção 3: Executar os Scripts SQL

#### Criação Manual dos Bancos
```bash
# Criar um banco específico
sqlite3 data/1_biblioteca.sqlite3 < sql/1_biblioteca.sql

# Verificar as tabelas criadas
sqlite3 data/1_biblioteca.sqlite3 "SELECT name FROM sqlite_master WHERE type='table';"
```

#### Criação Automatizada (Python)
O script [`criar_bancos.py`](criar_bancos.py) cria automaticamente todos os 10 bancos de dados:

```bash
# Instalar Python 3 (se necessário)
# https://www.python.org/downloads/

# Executar o script
python criar_bancos.py
```

**Saída esperada:**
```
============================================================
CRIAÇÃO DOS BANCOS DE DADOS SQLite
============================================================

[1/10] Criando banco: Biblioteca
✅ Banco 'Biblioteca' criado com sucesso: data/1_biblioteca.sqlite3

[2/10] Criando banco: Acadêmico
✅ Banco 'Acadêmico' criado com sucesso: data/2_academico.sqlite3

...

============================================================
RESUMO
============================================================
✅ Bancos criados com sucesso: 10
❌ Erros: 0
📊 Total: 10

🎉 Todos os bancos foram criados com sucesso!
```

---

### Opção 4: Explorar com SQLite

```bash
# Abrir um banco de dados
sqlite3 data/4_ecommerce.sqlite3

# Comandos úteis dentro do SQLite:
.tables                  # Listar todas as tabelas
.schema Clientes        # Ver estrutura de uma tabela
SELECT * FROM Produtos; # Consultar dados
.quit                   # Sair
```

---

## 📚 Conceitos de Modelagem Ensinados

### Relacionamentos
- ✅ **1:1 (Um-para-Um)** - Uma entidade se relaciona com exatamente uma outra
- ✅ **1:N (Um-para-Muitos)** - Uma entidade pai tem vários filhos
- ✅ **N:M (Muitos-para-Muitos)** - Múltiplas instâncias de ambos os lados
- ✅ **Auto-relacionamento** - Entidade se relaciona consigo mesma

### Técnicas Avançadas
- 🔹 **Tabelas Associativas** - Implementação de relacionamentos N:M
- 🔹 **Chaves Compostas** - PKs formadas por múltiplas colunas
- 🔹 **Histórico Temporal** - Registro de mudanças ao longo do tempo
- 🔹 **Valores Calculados** - Armazenamento de dados derivados
- 🔹 **Constraints Complexas** - CHECK, UNIQUE, NOT NULL
- 🔹 **Status e Estados** - Gestão de ciclo de vida de entidades

### Normalização
- 📐 **1NF (Primeira Forma Normal)** - Valores atômicos
- 📐 **2NF (Segunda Forma Normal)** - Dependência funcional completa
- 📐 **3NF (Terceira Forma Normal)** - Eliminação de dependências transitivas

### Boas Práticas
- ✨ Nomenclatura consistente e descritiva
- ✨ Uso adequado de tipos de dados
- ✨ Integridade referencial com Foreign Keys
- ✨ Documentação através de comentários
- ✨ Índices implícitos em PKs e FKs

---

## 📦 Entregáveis da Atividade C2

Para cada contexto escolhido, o projeto contém:

### 1️⃣ Listagem de Entidades e Atributos
**Localização:** Documentado nos arquivos de diagrama e SQL

Cada contexto lista claramente:
- ✅ Todas as entidades identificadas no sistema
- ✅ Atributos de cada entidade com tipos de dados
- ✅ Identificação de chaves primárias e estrangeiras

### 2️⃣ Diagrama MER Completo
**Localização:** Pasta [`diagramas/`](diagramas/)

Cada diagrama MER inclui:
- ✅ Todas as entidades representadas como retângulos
- ✅ Atributos listados dentro das entidades
- ✅ Relacionamentos representados com losangos
- ✅ Cardinalidades claramente indicadas (1:1, 1:N, N:M)
- ✅ Formato Mermaid renderizável

**Exemplo de arquivos:**
- [`diagramas/mer_1_biblioteca.md`](diagramas/mer_1_biblioteca.md)
- [`diagramas/mer_2_academico.md`](diagramas/mer_2_academico.md)
- E assim por diante...

### 3️⃣ Scripts SQL DDL (CREATE TABLE)
**Localização:** Pasta [`sql/`](sql/)

Cada script SQL contém:
- ✅ Comandos `CREATE TABLE` para todas as entidades
- ✅ Definição completa de tipos de dados
- ✅ Constraints de integridade (PRIMARY KEY, FOREIGN KEY)
- ✅ Constraints adicionais (NOT NULL, UNIQUE, CHECK, DEFAULT)
- ✅ Comentários explicativos
- ✅ Scripts testados e funcionais

**Exemplo de arquivos:**
- [`sql/1_biblioteca.sql`](sql/1_biblioteca.sql)
- [`sql/2_academico.sql`](sql/2_academico.sql)
- E assim por diante...

### 4️⃣ Bancos de Dados SQLite Gerados
**Localização:** Pasta [`data/`](data/)

Bancos de dados criados e testados:
- ✅ Estruturas implementadas e validadas
- ✅ Prontos para inspeção com DBeaver ou SQLite Browser
- ✅ Gerados automaticamente pelo script Python

---

## 🎯 Critérios de Avaliação Atendidos

### ✅ Identificação de Entidades e Atributos
- Todas as entidades relevantes foram identificadas para cada contexto
- Atributos apropriados com tipos de dados corretos
- Chaves primárias e estrangeiras claramente definidas

### ✅ Diagrama MER Completo
- Relacionamentos corretamente modelados
- Cardinalidades precisas (1:1, 1:N, N:M)
- Notação clara e padronizada
- Representação visual compreensível

### ✅ Implementação SQL DDL
- Comandos CREATE TABLE sintática e semanticamente corretos
- Constraints de integridade implementadas
- Foreign Keys configuradas adequadamente
- Scripts executáveis e testados


### ✅ Documentação
- README.md completo e detalhado
- Comentários nos scripts SQL
- Descrição clara de cada contexto
- Instruções de uso e ferramentas

---

## 🎓 Para Quem é Este Projeto

### 👨‍🎓 Estudantes
- Material completo para a Atividade Prática C2
- Aprenda modelagem de dados de forma prática
- Prepare-se para avaliações de Banco de Dados
- Entenda conceitos com exemplos reais progressivos

### 👨‍💻 Desenvolvedores
- Revise padrões de design de banco de dados
- Use como referência em projetos profissionais
- Estude diferentes abordagens de modelagem
- Prepare-se para entrevistas técnicas

### 👨‍🏫 Professores
- Material didático completo para atividades avaliativas
- Exemplos progressivos em complexidade (Baixa → Média → Alta)
- Recurso visual interativo para aulas
- Gabarito completo com todas as soluções

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Para contribuir:

1. **Fork** este repositório
2. **Clone** seu fork localmente
   ```bash
   git clone https://github.com/[seu-usuario]/db-modeling-c2.git
   ```
3. **Crie uma branch** para sua feature
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
4. **Faça suas alterações** e commit
   ```bash
   git commit -m "Adiciona nova funcionalidade X"
   ```
5. **Push** para sua branch
   ```bash
   git push origin feature/nova-funcionalidade
   ```
6. **Abra um Pull Request** explicando suas mudanças

### Sugestões de Contribuição
- 🆕 Adicionar novos contextos de modelagem
- 📝 Melhorar documentação
- 🎨 Aprimorar a interface web
- 🐛 Corrigir bugs ou inconsistências
- 🌍 Traduzir para outros idiomas
- ✨ Adicionar exemplos de queries SQL

---

## 📄 Licença

Este projeto é de código aberto e está disponível para fins **educacionais** e de **aprendizado**.

---

## 👥 Autor

Desenvolvido como projeto prático de estudo e ensino de modelagem de banco de dados.

---

## 🔗 Links Úteis

### Documentação Oficial
- [SQLite Documentation](https://www.sqlite.org/docs.html) - Documentação completa do SQLite
- [SQL Tutorial - W3Schools](https://www.w3schools.com/sql/) - Tutorial interativo de SQL
- [Database Design Tutorial](https://www.lucidchart.com/pages/database-diagram/database-design) - Guia de design de banco de dados

### Ferramentas Recomendadas para a Atividade
- **[Draw.io](https://app.diagrams.net/)** - Criar diagramas MER (gratuito, online/offline)
- **[DBeaver Portable](https://dbeaver.io/download/)** - Gerenciar bancos de dados (gratuito, sem instalação)
- [DB Browser for SQLite](https://sqlitebrowser.org/) - Interface gráfica alternativa para SQLite
- [Mermaid Live Editor](https://mermaid.live/) - Editor online para diagramas Mermaid
- [SQLite Online](https://sqliteonline.com/) - Execute SQL online sem instalação

### Leitura Complementar
- [Normalização de Banco de Dados](https://www.devmedia.com.br/normalizacao-de-dados-tutorial/19538) - Tutorial sobre normalização
- [Modelagem ER](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento) - O que é diagrama ER
- [SQL Style Guide](https://www.sqlstyle.guide/pt-br/) - Guia de estilo para SQL

---

## 📊 Estatísticas da Atividade C2

### Escopo Completo do Projeto
- 📁 **10 Contextos** de modelagem (Baixa → Média → Alta complexidade)
- 📄 **10 Diagramas MER** completos em formato Mermaid
- 💾 **10 Scripts SQL DDL** testados e funcionais
- 🗂️ **60+ Tabelas** demonstrando diferentes padrões de modelagem
- 🔗 **100+ Relacionamentos** entre entidades (1:1, 1:N, N:M)
- 📝 **1000+ Linhas** de código SQL comentado e documentado

### Cobertura de Conceitos
- ✅ **3 níveis** de complexidade progressiva
- ✅ **Todos os tipos** de relacionamento (1:1, 1:N, N:M, auto-relacionamento)
- ✅ **Técnicas avançadas** (histórico temporal, valores calculados, ciclo de vida)
- ✅ **Normalização** aplicada (1NF, 2NF, 3NF)
- ✅ **Constraints completas** (PK, FK, UNIQUE, CHECK, NOT NULL, DEFAULT)

---

## ❓ FAQ - Perguntas Frequentes

**P: Preciso instalar algum banco de dados?**
R: Não! O SQLite é embutido e não requer instalação separada. Basta ter Python ou usar a interface web.

**P: Os bancos já vêm com dados de exemplo?**
R: Os scripts SQL criam apenas a estrutura (DDL). Você pode adicionar dados de teste conforme necessário.

**P: Posso usar este projeto para aprender outras linguagens?**
R: Sim! Os conceitos de modelagem são universais. Você pode adaptar os scripts para MySQL, PostgreSQL, etc.

**P: Como faço para contribuir com um novo contexto?**
R: Crie os arquivos na mesma estrutura (diagrama MER + script SQL), documente bem e envie um Pull Request!

**P: Posso usar este projeto em trabalhos acadêmicos?**
R: Sim, desde que cite a fonte apropriadamente.

---

## 🎯 Possíveis Extensões Futuras

### Para Alunos que Desejam Aprofundar
- [ ] Adicionar dados de exemplo (DML - INSERT) para cada contexto
- [ ] Criar queries SQL de consulta (SELECT complexos com JOINs)
- [ ] Implementar views e stored procedures
- [ ] Adicionar índices para otimização de performance
- [ ] Criar triggers para regras de negócio automáticas

### Para o Projeto em Si
- [ ] Adicionar testes automatizados das estruturas
- [ ] Implementar versões para MySQL e PostgreSQL
- [ ] Criar vídeos tutoriais explicativos
- [ ] Adicionar exercícios práticos com soluções
- [ ] Desenvolver API REST para acesso aos bancos
- [ ] Criar versão mobile-friendly da interface

---

<div align="center">

### ⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

**Feito com ❤️ para a comunidade de desenvolvedores e estudantes**

</div>
---

## 👥 Autor

Desenvolvido como projeto prático de estudo e ensino de modelagem de banco de dados.

---

## 🔗 Links Úteis

### Documentação Oficial
- [SQLite Documentation](https://www.sqlite.org/docs.html) - Documentação completa do SQLite
- [SQL Tutorial - W3Schools](https://www.w3schools.com/sql/) - Tutorial interativo de SQL
- [Database Design Tutorial](https://www.lucidchart.com/pages/database-diagram/database-design) - Guia de design de banco de dados

### Ferramentas Recomendadas para a Atividade
- **[Draw.io](https://app.diagrams.net/)** - Criar diagramas MER (gratuito, online/offline)
- **[DBeaver Portable](https://dbeaver.io/download/)** - Gerenciar bancos de dados (gratuito, sem instalação)
- [DB Browser for SQLite](https://sqlitebrowser.org/) - Interface gráfica alternativa para SQLite
- [Mermaid Live Editor](https://mermaid.live/) - Editor online para diagramas Mermaid
- [SQLite Online](https://sqliteonline.com/) - Execute SQL online sem instalação

### Leitura Complementar
- [Normalização de Banco de Dados](https://www.devmedia.com.br/normalizacao-de-dados-tutorial/19538) - Tutorial sobre normalização
- [Modelagem ER](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-entidade-relacionamento) - O que é diagrama ER
- [SQL Style Guide](https://www.sqlstyle.guide/pt-br/) - Guia de estilo para SQL

---

## 📊 Estatísticas da Atividade C2

### Escopo Completo do Projeto
- 📁 **10 Contextos** de modelagem (Baixa → Média → Alta complexidade)
- 📄 **10 Diagramas MER** completos em formato Mermaid
- 💾 **10 Scripts SQL DDL** testados e funcionais
- 🗂️ **60+ Tabelas** demonstrando diferentes padrões de modelagem
- 🔗 **100+ Relacionamentos** entre entidades (1:1, 1:N, N:M)
- 📝 **1000+ Linhas** de código SQL comentado e documentado

### Cobertura de Conceitos
- ✅ **3 níveis** de complexidade progressiva
- ✅ **Todos os tipos** de relacionamento (1:1, 1:N, N:M, auto-relacionamento)
- ✅ **Técnicas avançadas** (histórico temporal, valores calculados, ciclo de vida)
- ✅ **Normalização** aplicada (1NF, 2NF, 3NF)
- ✅ **Constraints completas** (PK, FK, UNIQUE, CHECK, NOT NULL, DEFAULT)

---

## ❓ FAQ - Perguntas Frequentes

**P: Preciso instalar algum banco de dados?**
R: Não! O SQLite é embutido e não requer instalação separada. Basta ter Python ou usar a interface web.

**P: Os bancos já vêm com dados de exemplo?**
R: Os scripts SQL criam apenas a estrutura (DDL). Você pode adicionar dados de teste conforme necessário.

**P: Posso usar este projeto para aprender outras linguagens?**
R: Sim! Os conceitos de modelagem são universais. Você pode adaptar os scripts para MySQL, PostgreSQL, etc.

**P: Como faço para contribuir com um novo contexto?**
R: Crie os arquivos na mesma estrutura (diagrama MER + script SQL), documente bem e envie um Pull Request!

**P: Posso usar este projeto em trabalhos acadêmicos?**
R: Sim, desde que cite a fonte apropriadamente.

---

## 🎯 Possíveis Extensões Futuras

### Para Alunos que Desejam Aprofundar
- [ ] Adicionar dados de exemplo (DML - INSERT) para cada contexto
- [ ] Criar queries SQL de consulta (SELECT complexos com JOINs)
- [ ] Implementar views e stored procedures
- [ ] Adicionar índices para otimização de performance
- [ ] Criar triggers para regras de negócio automáticas

### Para o Projeto em Si
- [ ] Adicionar testes automatizados das estruturas
- [ ] Implementar versões para MySQL e PostgreSQL
- [ ] Criar vídeos tutoriais explicativos
- [ ] Adicionar exercícios práticos com soluções
- [ ] Desenvolver API REST para acesso aos bancos
- [ ] Criar versão mobile-friendly da interface

---

<div align="center">

### ⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

**Feito com ❤️ para a comunidade de desenvolvedores e estudantes**

</div>