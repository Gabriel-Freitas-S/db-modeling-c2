/**
 * Dados completos dos 10 contextos de modelagem de banco de dados
 * Inclui entidades, atributos, relacionamentos e diagramas Mermaid
 */

const CONTEXTOS_DATA = [
    {
        id: 1,
        nome: "Sistema de Biblioteca",
        complexidade: "Baixa",
        descricao: "Sistema básico de biblioteca com gestão de livros, exemplares, usuários e empréstimos. Demonstra o padrão de relacionamento Um-para-Muitos.",
        padroes: [
            "Relacionamento Um-para-Muitos (Livro → Exemplar)",
            "Separação entre conceito abstrato e instância física",
            "Gestão de status e ciclo de vida"
        ],
        entidades: [
            {
                nome: "Livros",
                atributos: [
                    { nome: "isbn", tipo: "TEXT", pk: true, descricao: "ISBN do livro" },
                    { nome: "titulo", tipo: "TEXT", notNull: true, descricao: "Título do livro" },
                    { nome: "autor", tipo: "TEXT", notNull: true, descricao: "Autor do livro" },
                    { nome: "editora", tipo: "TEXT", descricao: "Editora" },
                    { nome: "ano_publicacao", tipo: "INTEGER", descricao: "Ano de publicação" }
                ]
            },
            {
                nome: "Exemplares",
                atributos: [
                    { nome: "exemplar_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "livro_isbn", tipo: "TEXT", fk: "Livros", notNull: true, descricao: "ISBN do livro" },
                    { nome: "status", tipo: "TEXT", notNull: true, descricao: "Status (Disponível, Emprestado, Manutenção)" }
                ]
            },
            {
                nome: "Usuarios",
                atributos: [
                    { nome: "usuario_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "telefone", tipo: "TEXT", descricao: "Telefone" },
                    { nome: "email", tipo: "TEXT", notNull: true, unique: true, descricao: "E-mail único" }
                ]
            },
            {
                nome: "Emprestimos",
                atributos: [
                    { nome: "emprestimo_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "exemplar_id", tipo: "INTEGER", fk: "Exemplares", notNull: true, descricao: "ID do exemplar" },
                    { nome: "usuario_id", tipo: "INTEGER", fk: "Usuarios", notNull: true, descricao: "ID do usuário" },
                    { nome: "data_retirada", tipo: "TEXT", notNull: true, descricao: "Data de retirada" },
                    { nome: "data_devolucao_prevista", tipo: "TEXT", notNull: true, descricao: "Data prevista" },
                    { nome: "data_devolucao_real", tipo: "TEXT", descricao: "Data real de devolução" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Livros", para: "Exemplares", tipo: "1:N", descricao: "Um livro possui múltiplos exemplares" },
            { de: "Usuarios", para: "Emprestimos", tipo: "1:N", descricao: "Um usuário realiza múltiplos empréstimos" },
            { de: "Exemplares", para: "Emprestimos", tipo: "1:N", descricao: "Um exemplar pode estar em múltiplos empréstimos ao longo do tempo" }
        ],
        diagramaMermaid: `erDiagram
    Livros {
        TEXT isbn PK
        TEXT titulo
        TEXT autor
        TEXT editora
        INTEGER ano_publicacao
    }
    Exemplares {
        INTEGER exemplar_id PK
        TEXT livro_isbn FK
        TEXT status
    }
    Usuarios {
        INTEGER usuario_id PK
        TEXT nome
        TEXT telefone
        TEXT email
    }
    Emprestimos {
        INTEGER emprestimo_id PK
        INTEGER exemplar_id FK
        INTEGER usuario_id FK
        TEXT data_retirada
        TEXT data_devolucao_prevista
        TEXT data_devolucao_real
    }

    Livros ||--|{ Exemplares : "possui"
    Usuarios ||--|{ Emprestimos : "realiza"
    Exemplares ||--|{ Emprestimos : "é emprestado em"`,
        sqlPath: "sql/1_biblioteca.sql",
        sqlContent: `-- sql/1_biblioteca.sql

-- Tabela para armazenar as informações bibliográficas dos livros
CREATE TABLE Livros (
    isbn TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    editora TEXT,
    ano_publicacao INTEGER
);

-- Tabela para representar cada cópia física de um livro
CREATE TABLE Exemplares (
    exemplar_id INTEGER PRIMARY KEY AUTOINCREMENT,
    livro_isbn TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Disponível', 'Emprestado', 'Manutenção')),
    FOREIGN KEY (livro_isbn) REFERENCES Livros(isbn)
);

-- Tabela para os usuários da biblioteca
CREATE TABLE Usuarios (
    usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT,
    email TEXT NOT NULL UNIQUE
);

-- Tabela para registrar os empréstimos de exemplares para usuários
CREATE TABLE Emprestimos (
    emprestimo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    exemplar_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    data_retirada TEXT NOT NULL, -- Formato: 'YYYY-MM-DD HH:MM:SS'
    data_devolucao_prevista TEXT NOT NULL,
    data_devolucao_real TEXT, -- Nulo enquanto o livro não for devolvido
    FOREIGN KEY (exemplar_id) REFERENCES Exemplares(exemplar_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);`
    },
    {
        id: 2,
        nome: "Controle Acadêmico Simplificado",
        complexidade: "Baixa",
        descricao: "Sistema acadêmico com alunos, professores e disciplinas. Introduz o padrão clássico de relacionamento Muitos-para-Muitos.",
        padroes: [
            "Relacionamento Muitos-para-Muitos (Professor ↔ Disciplina)",
            "Tabelas de junção (associativas)",
            "Múltiplos relacionamentos N:M"
        ],
        entidades: [
            {
                nome: "Alunos",
                atributos: [
                    { nome: "matricula", tipo: "TEXT", pk: true, descricao: "Matrícula do aluno" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "data_nascimento", tipo: "TEXT", descricao: "Data de nascimento" },
                    { nome: "telefone", tipo: "TEXT", descricao: "Telefone de contato" }
                ]
            },
            {
                nome: "Professores",
                atributos: [
                    { nome: "matricula", tipo: "TEXT", pk: true, descricao: "Matrícula do professor" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "formacao", tipo: "TEXT", descricao: "Formação acadêmica" },
                    { nome: "telefone", tipo: "TEXT", descricao: "Telefone de contato" }
                ]
            },
            {
                nome: "Disciplinas",
                atributos: [
                    { nome: "codigo", tipo: "TEXT", pk: true, descricao: "Código da disciplina" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome da disciplina" },
                    { nome: "carga_horaria", tipo: "INTEGER", notNull: true, descricao: "Carga horária em horas" }
                ]
            },
            {
                nome: "ProfessorDisciplina",
                atributos: [
                    { nome: "professor_matricula", tipo: "TEXT", pk: true, fk: "Professores", notNull: true, descricao: "Matrícula do professor" },
                    { nome: "disciplina_codigo", tipo: "TEXT", pk: true, fk: "Disciplinas", notNull: true, descricao: "Código da disciplina" }
                ]
            },
            {
                nome: "Matriculas",
                atributos: [
                    { nome: "aluno_matricula", tipo: "TEXT", pk: true, fk: "Alunos", notNull: true, descricao: "Matrícula do aluno" },
                    { nome: "disciplina_codigo", tipo: "TEXT", pk: true, fk: "Disciplinas", notNull: true, descricao: "Código da disciplina" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Professores", para: "Disciplinas", tipo: "N:M", descricao: "Um professor leciona várias disciplinas e uma disciplina pode ter vários professores" },
            { de: "Alunos", para: "Disciplinas", tipo: "N:M", descricao: "Um aluno se matricula em várias disciplinas e uma disciplina pode ter vários alunos" }
        ],
        diagramaMermaid: `erDiagram
    Alunos {
        TEXT matricula PK
        TEXT nome
        TEXT data_nascimento
        TEXT telefone
    }
    Professores {
        TEXT matricula PK
        TEXT nome
        TEXT formacao
        TEXT telefone
    }
    Disciplinas {
        TEXT codigo PK
        TEXT nome
        INTEGER carga_horaria
    }
    ProfessorDisciplina {
        TEXT professor_matricula PK, FK
        TEXT disciplina_codigo PK, FK
    }
    Matriculas {
        TEXT aluno_matricula PK, FK
        TEXT disciplina_codigo PK, FK
    }

    Professores }o--o{ Disciplinas : "leciona"
    Alunos }o--o{ Disciplinas : "se matricula em"

    ProfessorDisciplina }o--|| Professores : "associa"
    ProfessorDisciplina }o--|| Disciplinas : "associa"
    Matriculas }o--|| Alunos : "associa"
    Matriculas }o--|| Disciplinas : "associa"`,
        sqlPath: "sql/2_academico.sql",
        sqlContent: `-- sql/2_academico.sql

CREATE TABLE Alunos (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    data_nascimento TEXT,
    telefone TEXT
);

CREATE TABLE Professores (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    formacao TEXT,
    telefone TEXT
);

CREATE TABLE Disciplinas (
    codigo TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    carga_horaria INTEGER NOT NULL
);

-- Tabela de junção para o relacionamento N:M entre Professores e Disciplinas
CREATE TABLE ProfessorDisciplina (
    professor_matricula TEXT NOT NULL,
    disciplina_codigo TEXT NOT NULL,
    FOREIGN KEY (professor_matricula) REFERENCES Professores(matricula),
    FOREIGN KEY (disciplina_codigo) REFERENCES Disciplinas(codigo),
    PRIMARY KEY (professor_matricula, disciplina_codigo) -- Chave primária composta
);

-- Tabela de junção para o relacionamento N:M entre Alunos e Disciplinas
CREATE TABLE Matriculas (
    aluno_matricula TEXT NOT NULL,
    disciplina_codigo TEXT NOT NULL,
    FOREIGN KEY (aluno_matricula) REFERENCES Alunos(matricula),
    FOREIGN KEY (disciplina_codigo) REFERENCES Disciplinas(codigo),
    PRIMARY KEY (aluno_matricula, disciplina_codigo)
);`
    },
    {
        id: 3,
        nome: "Clínica Médica",
        complexidade: "Média",
        descricao: "Sistema de clínica com médicos, pacientes e consultas. Demonstra o relacionamento Um-para-Um entre Consulta e Prontuário.",
        padroes: [
            "Relacionamento Um-para-Um (Consulta → Prontuário)",
            "Separação de conceitos relacionados mas distintos",
            "Constraint UNIQUE para garantir cardinalidade 1:1"
        ],
        entidades: [
            {
                nome: "Medicos",
                atributos: [
                    { nome: "crm", tipo: "TEXT", pk: true, descricao: "CRM do médico" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "especialidade", tipo: "TEXT", notNull: true, descricao: "Especialidade médica" },
                    { nome: "telefone", tipo: "TEXT", descricao: "Telefone" }
                ]
            },
            {
                nome: "Pacientes",
                atributos: [
                    { nome: "cpf", tipo: "TEXT", pk: true, descricao: "CPF do paciente" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "data_nascimento", tipo: "TEXT", notNull: true, descricao: "Data de nascimento" },
                    { nome: "telefone", tipo: "TEXT", descricao: "Telefone" }
                ]
            },
            {
                nome: "Consultas",
                atributos: [
                    { nome: "consulta_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "medico_crm", tipo: "TEXT", fk: "Medicos", notNull: true, descricao: "CRM do médico" },
                    { nome: "paciente_cpf", tipo: "TEXT", fk: "Pacientes", notNull: true, descricao: "CPF do paciente" },
                    { nome: "data_hora", tipo: "TEXT", notNull: true, descricao: "Data e hora" },
                    { nome: "valor", tipo: "REAL", descricao: "Valor da consulta" }
                ]
            },
            {
                nome: "Prontuarios",
                atributos: [
                    { nome: "prontuario_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "consulta_id", tipo: "INTEGER", fk: "Consultas", notNull: true, unique: true, descricao: "ID da consulta (UNIQUE garante 1:1)" },
                    { nome: "diagnostico", tipo: "TEXT", notNull: true, descricao: "Diagnóstico médico" },
                    { nome: "prescricao", tipo: "TEXT", descricao: "Prescrição de medicamentos" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Medicos", para: "Consultas", tipo: "1:N", descricao: "Um médico realiza múltiplas consultas" },
            { de: "Pacientes", para: "Consultas", tipo: "1:N", descricao: "Um paciente participa de múltiplas consultas" },
            { de: "Consultas", para: "Prontuarios", tipo: "1:1", descricao: "Uma consulta gera exatamente um prontuário" }
        ],
        diagramaMermaid: `erDiagram
    Medicos {
        TEXT crm PK
        TEXT nome
        TEXT especialidade
        TEXT telefone
    }
    Pacientes {
        TEXT cpf PK
        TEXT nome
        TEXT data_nascimento
        TEXT telefone
    }
    Consultas {
        INTEGER consulta_id PK
        TEXT medico_crm FK
        TEXT paciente_cpf FK
        TEXT data_hora
        REAL valor
    }
    Prontuarios {
        INTEGER prontuario_id PK
        INTEGER consulta_id FK, UK
        TEXT diagnostico
        TEXT prescricao
    }

    Medicos ||--|{ Consultas : "realiza"
    Pacientes ||--|{ Consultas : "participa de"
    Consultas ||--|| Prontuarios : "gera"`,
        sqlPath: "sql/3_clinica.sql",
        sqlContent: `-- sql/3_clinica.sql

CREATE TABLE Medicos (
    crm TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    telefone TEXT
);

CREATE TABLE Pacientes (
    cpf TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    data_nascimento TEXT NOT NULL,
    telefone TEXT
);

CREATE TABLE Consultas (
    consulta_id INTEGER PRIMARY KEY AUTOINCREMENT,
    medico_crm TEXT NOT NULL,
    paciente_cpf TEXT NOT NULL,
    data_hora TEXT NOT NULL UNIQUE, -- Uma consulta por data/hora
    valor REAL,
    FOREIGN KEY (medico_crm) REFERENCES Medicos(crm),
    FOREIGN KEY (paciente_cpf) REFERENCES Pacientes(cpf)
);

-- Tabela para os prontuários, com relacionamento 1:1 com Consultas
CREATE TABLE Prontuarios (
    prontuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    consulta_id INTEGER NOT NULL UNIQUE, -- A constraint UNIQUE na FK força a cardinalidade 1:1
    diagnostico TEXT NOT NULL,
    prescricao TEXT,
    FOREIGN KEY (consulta_id) REFERENCES Consultas(consulta_id)
);`
    },
    {
        id: 4,
        nome: "E-commerce Básico",
        complexidade: "Média",
        descricao: "Loja virtual com clientes, produtos e pedidos. Introduz relacionamento N:M com atributos na tabela de junção.",
        padroes: [
            "Relacionamento N:M com atributos (quantidade, preço)",
            "Registro histórico de preços",
            "Gestão de transações comerciais"
        ],
        entidades: [
            {
                nome: "Clientes",
                atributos: [
                    { nome: "cpf", tipo: "TEXT", pk: true, descricao: "CPF do cliente" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "email", tipo: "TEXT", notNull: true, unique: true, descricao: "E-mail único" },
                    { nome: "telefone", tipo: "TEXT", descricao: "Telefone" },
                    { nome: "endereco", tipo: "TEXT", descricao: "Endereço de entrega" }
                ]
            },
            {
                nome: "Produtos",
                atributos: [
                    { nome: "produto_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome do produto" },
                    { nome: "descricao", tipo: "TEXT", descricao: "Descrição detalhada" },
                    { nome: "preco", tipo: "REAL", notNull: true, descricao: "Preço atual" },
                    { nome: "estoque", tipo: "INTEGER", notNull: true, descricao: "Quantidade em estoque" }
                ]
            },
            {
                nome: "Pedidos",
                atributos: [
                    { nome: "pedido_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "cliente_cpf", tipo: "TEXT", fk: "Clientes", notNull: true, descricao: "CPF do cliente" },
                    { nome: "data_pedido", tipo: "TEXT", notNull: true, descricao: "Data e hora do pedido" },
                    { nome: "status", tipo: "TEXT", notNull: true, descricao: "Status (Pendente, Enviado, etc)" }
                ]
            },
            {
                nome: "PedidoItens",
                atributos: [
                    { nome: "pedido_id", tipo: "INTEGER", pk: true, fk: "Pedidos", notNull: true, descricao: "ID do pedido" },
                    { nome: "produto_id", tipo: "INTEGER", pk: true, fk: "Produtos", notNull: true, descricao: "ID do produto" },
                    { nome: "quantidade", tipo: "INTEGER", notNull: true, descricao: "Quantidade comprada" },
                    { nome: "preco_unitario", tipo: "REAL", notNull: true, descricao: "Preço no momento da compra" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Clientes", para: "Pedidos", tipo: "1:N", descricao: "Um cliente faz múltiplos pedidos" },
            { de: "Pedidos", para: "Produtos", tipo: "N:M", descricao: "Um pedido contém vários produtos, um produto pode estar em vários pedidos" }
        ],
        diagramaMermaid: `erDiagram
    Clientes {
        TEXT cpf PK
        TEXT nome
        TEXT email
        TEXT telefone
        TEXT endereco
    }
    Produtos {
        INTEGER produto_id PK
        TEXT nome
        TEXT descricao
        REAL preco
        INTEGER estoque
    }
    Pedidos {
        INTEGER pedido_id PK
        TEXT cliente_cpf FK
        TEXT data_pedido
        TEXT status
    }
    PedidoItens {
        INTEGER pedido_id PK, FK
        INTEGER produto_id PK, FK
        INTEGER quantidade
        REAL preco_unitario
    }

    Clientes ||--|{ Pedidos : "faz"
    Pedidos }o--o{ Produtos : "contém"
    PedidoItens }o--|| Pedidos : "detalha"
    PedidoItens }o--|| Produtos : "detalha"`,
        sqlPath: "sql/4_ecommerce.sql",
        sqlContent: `-- sql/4_ecommerce.sql

CREATE TABLE Clientes (
    cpf TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    endereco TEXT
);

CREATE TABLE Produtos (
    produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL CHECK(preco > 0),
    estoque INTEGER NOT NULL CHECK(estoque >= 0)
);

CREATE TABLE Pedidos (
    pedido_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_cpf TEXT NOT NULL,
    data_pedido TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado')),
    FOREIGN KEY (cliente_cpf) REFERENCES Clientes(cpf)
);

-- Tabela de junção para os itens de um pedido (relacionamento N:M com atributos)
CREATE TABLE PedidoItens (
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL CHECK(quantidade > 0),
    preco_unitario REAL NOT NULL, -- Preço no momento da compra para histórico
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id),
    PRIMARY KEY (pedido_id, produto_id)
);`
    },
    {
        id: 5,
        nome: "Rede Social de Fotos",
        complexidade: "Média",
        descricao: "Rede social com álbuns, fotos, comentários e curtidas. Demonstra múltiplos relacionamentos entre as mesmas entidades.",
        padroes: [
            "Múltiplos relacionamentos N:M entre mesmas entidades",
            "Relacionamento reflexivo de interações sociais",
            "Estrutura hierárquica (Usuário → Álbum → Foto)"
        ],
        entidades: [
            {
                nome: "Usuarios",
                atributos: [
                    { nome: "usuario_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome_usuario", tipo: "TEXT", notNull: true, unique: true, descricao: "Nome de usuário único" },
                    { nome: "email", tipo: "TEXT", notNull: true, unique: true, descricao: "E-mail único" },
                    { nome: "data_cadastro", tipo: "TEXT", notNull: true, descricao: "Data de cadastro" }
                ]
            },
            {
                nome: "Albuns",
                atributos: [
                    { nome: "album_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "usuario_id", tipo: "INTEGER", fk: "Usuarios", notNull: true, descricao: "Dono do álbum" },
                    { nome: "titulo", tipo: "TEXT", notNull: true, descricao: "Título do álbum" },
                    { nome: "descricao", tipo: "TEXT", descricao: "Descrição" },
                    { nome: "data_criacao", tipo: "TEXT", notNull: true, descricao: "Data de criação" }
                ]
            },
            {
                nome: "Fotos",
                atributos: [
                    { nome: "foto_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "album_id", tipo: "INTEGER", fk: "Albuns", notNull: true, descricao: "ID do álbum" },
                    { nome: "url_imagem", tipo: "TEXT", notNull: true, unique: true, descricao: "URL da imagem" },
                    { nome: "titulo", tipo: "TEXT", descricao: "Título da foto" },
                    { nome: "data_upload", tipo: "TEXT", notNull: true, descricao: "Data do upload" }
                ]
            },
            {
                nome: "Comentarios",
                atributos: [
                    { nome: "comentario_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "foto_id", tipo: "INTEGER", fk: "Fotos", notNull: true, descricao: "ID da foto" },
                    { nome: "usuario_id", tipo: "INTEGER", fk: "Usuarios", notNull: true, descricao: "Autor do comentário" },
                    { nome: "texto", tipo: "TEXT", notNull: true, descricao: "Texto do comentário" },
                    { nome: "data_comentario", tipo: "TEXT", notNull: true, descricao: "Data e hora" }
                ]
            },
            {
                nome: "Curtidas",
                atributos: [
                    { nome: "usuario_id", tipo: "INTEGER", pk: true, fk: "Usuarios", notNull: true, descricao: "ID do usuário" },
                    { nome: "foto_id", tipo: "INTEGER", pk: true, fk: "Fotos", notNull: true, descricao: "ID da foto" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Usuarios", para: "Albuns", tipo: "1:N", descricao: "Um usuário cria múltiplos álbuns" },
            { de: "Albuns", para: "Fotos", tipo: "1:N", descricao: "Um álbum contém múltiplas fotos" },
            { de: "Usuarios", para: "Comentarios", tipo: "1:N", descricao: "Um usuário escreve múltiplos comentários" },
            { de: "Fotos", para: "Comentarios", tipo: "1:N", descricao: "Uma foto recebe múltiplos comentários" },
            { de: "Usuarios", para: "Fotos", tipo: "N:M (curtidas)", descricao: "Um usuário curte múltiplas fotos, uma foto é curtida por múltiplos usuários" }
        ],
        diagramaMermaid: `erDiagram
    Usuarios {
        INTEGER usuario_id PK
        TEXT nome_usuario
        TEXT email
        TEXT data_cadastro
    }
    Albuns {
        INTEGER album_id PK
        INTEGER usuario_id FK
        TEXT titulo
        TEXT descricao
        TEXT data_criacao
    }
    Fotos {
        INTEGER foto_id PK
        INTEGER album_id FK
        TEXT url_imagem
        TEXT titulo
        TEXT data_upload
    }
    Comentarios {
        INTEGER comentario_id PK
        INTEGER foto_id FK
        INTEGER usuario_id FK
        TEXT texto
        TEXT data_comentario
    }
    Curtidas {
        INTEGER usuario_id PK, FK
        INTEGER foto_id PK, FK
    }

    Usuarios ||--|{ Albuns : "cria"
    Albuns ||--|{ Fotos : "contém"
    Usuarios ||--|{ Comentarios : "escreve"
    Fotos ||--|{ Comentarios : "recebe"
    Usuarios }o--o{ Fotos : "curte"
    Curtidas }o--|| Usuarios : "registra curtida de"
    Curtidas }o--|| Fotos : "registra curtida em"`,
        sqlPath: "sql/5_rede_social.sql",
        sqlContent: `-- sql/5_rede_social.sql

CREATE TABLE Usuarios (
    usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_usuario TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    data_cadastro TEXT NOT NULL
);

CREATE TABLE Albuns (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_criacao TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE Fotos (
    foto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER NOT NULL,
    url_imagem TEXT NOT NULL UNIQUE,
    titulo TEXT,
    data_upload TEXT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES Albuns(album_id)
);

CREATE TABLE Comentarios (
    comentario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    foto_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    data_comentario TEXT NOT NULL,
    FOREIGN KEY (foto_id) REFERENCES Fotos(foto_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabela de junção para o relacionamento N:M de curtidas
CREATE TABLE Curtidas (
    usuario_id INTEGER NOT NULL,
    foto_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (foto_id) REFERENCES Fotos(foto_id),
    PRIMARY KEY (usuario_id, foto_id)
);`
    },
    {
        id: 6,
        nome: "Sistema de RH",
        complexidade: "Média",
        descricao: "Gestão de recursos humanos com funcionários, departamentos e cargos. Demonstra modelagem de histórico temporal.",
        padroes: [
            "Tabela de associação temporal (histórico)",
            "Registro de mudanças ao longo do tempo",
            "Relacionamento ternário (Funcionário-Cargo-Departamento)"
        ],
        entidades: [
            {
                nome: "Funcionarios",
                atributos: [
                    { nome: "matricula", tipo: "TEXT", pk: true, descricao: "Matrícula do funcionário" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "cpf", tipo: "TEXT", notNull: true, unique: true, descricao: "CPF único" },
                    { nome: "data_admissao", tipo: "TEXT", notNull: true, descricao: "Data de admissão" }
                ]
            },
            {
                nome: "Departamentos",
                atributos: [
                    { nome: "depto_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, unique: true, descricao: "Nome do departamento" }
                ]
            },
            {
                nome: "Cargos",
                atributos: [
                    { nome: "cargo_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, unique: true, descricao: "Nome do cargo" },
                    { nome: "salario_base", tipo: "REAL", notNull: true, descricao: "Salário base do cargo" }
                ]
            },
            {
                nome: "HistoricoAlocacoes",
                atributos: [
                    { nome: "historico_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "funcionario_matricula", tipo: "TEXT", fk: "Funcionarios", notNull: true, descricao: "Matrícula do funcionário" },
                    { nome: "departamento_id", tipo: "INTEGER", fk: "Departamentos", notNull: true, descricao: "ID do departamento" },
                    { nome: "cargo_id", tipo: "INTEGER", fk: "Cargos", notNull: true, descricao: "ID do cargo" },
                    { nome: "data_inicio", tipo: "TEXT", notNull: true, descricao: "Data de início" },
                    { nome: "data_fim", tipo: "TEXT", descricao: "Data de fim (NULL para atual)" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Funcionarios", para: "HistoricoAlocacoes", tipo: "1:N", descricao: "Um funcionário tem múltiplas alocações ao longo do tempo" },
            { de: "Departamentos", para: "HistoricoAlocacoes", tipo: "1:N", descricao: "Um departamento tem múltiplas alocações" },
            { de: "Cargos", para: "HistoricoAlocacoes", tipo: "1:N", descricao: "Um cargo é ocupado em múltiplas alocações" }
        ],
        diagramaMermaid: `erDiagram
    Funcionarios {
        TEXT matricula PK
        TEXT nome
        TEXT cpf
        TEXT data_admissao
    }
    Departamentos {
        INTEGER depto_id PK
        TEXT nome
    }
    Cargos {
        INTEGER cargo_id PK
        TEXT nome
        REAL salario_base
    }
    HistoricoAlocacoes {
        INTEGER historico_id PK
        TEXT funcionario_matricula FK
        INTEGER departamento_id FK
        INTEGER cargo_id FK
        TEXT data_inicio
        TEXT data_fim
    }

    Funcionarios ||--|{ HistoricoAlocacoes : "tem histórico de"
    Departamentos ||--|{ HistoricoAlocacoes : "tem alocação em"
    Cargos ||--|{ HistoricoAlocacoes : "ocupa em"`,
        sqlPath: "sql/6_rh.sql",
        sqlContent: `-- sql/6_rh.sql

CREATE TABLE Funcionarios (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    data_admissao TEXT NOT NULL
);

CREATE TABLE Departamentos (
    depto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
);

CREATE TABLE Cargos (
    cargo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    salario_base REAL NOT NULL
);

-- Tabela para registrar o histórico de alocações de funcionários
CREATE TABLE HistoricoAlocacoes (
    historico_id INTEGER PRIMARY KEY AUTOINCREMENT,
    funcionario_matricula TEXT NOT NULL,
    departamento_id INTEGER NOT NULL,
    cargo_id INTEGER NOT NULL,
    data_inicio TEXT NOT NULL,
    data_fim TEXT, -- Fica NULL para a alocação atual
    FOREIGN KEY (funcionario_matricula) REFERENCES Funcionarios(matricula),
    FOREIGN KEY (departamento_id) REFERENCES Departamentos(depto_id),
    FOREIGN KEY (cargo_id) REFERENCES Cargos(cargo_id)
);`
    },
    {
        id: 7,
        nome: "Locadora de Veículos",
        complexidade: "Alta",
        descricao: "Sistema completo de locadora com reservas, locações e manutenções. Demonstra gestão de ciclo de vida e estados.",
        padroes: [
            "Gerenciamento de ciclo de vida de ativos",
            "Múltiplos estados e transições",
            "Relacionamento entre eventos temporais"
        ],
        entidades: [
            {
                nome: "Clientes",
                atributos: [
                    { nome: "cnh", tipo: "TEXT", pk: true, descricao: "CNH do cliente" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "telefone", tipo: "TEXT", descricao: "Telefone" },
                    { nome: "endereco", tipo: "TEXT", descricao: "Endereço" }
                ]
            },
            {
                nome: "Veiculos",
                atributos: [
                    { nome: "placa", tipo: "TEXT", pk: true, descricao: "Placa do veículo" },
                    { nome: "modelo", tipo: "TEXT", notNull: true, descricao: "Modelo" },
                    { nome: "marca", tipo: "TEXT", notNull: true, descricao: "Marca" },
                    { nome: "ano", tipo: "INTEGER", descricao: "Ano de fabricação" },
                    { nome: "cor", tipo: "TEXT", descricao: "Cor" },
                    { nome: "status", tipo: "TEXT", notNull: true, descricao: "Status (Disponível, Locado, Em Manutenção)" }
                ]
            },
            {
                nome: "Reservas",
                atributos: [
                    { nome: "reserva_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "cliente_cnh", tipo: "TEXT", fk: "Clientes", notNull: true, descricao: "CNH do cliente" },
                    { nome: "veiculo_placa", tipo: "TEXT", fk: "Veiculos", notNull: true, descricao: "Placa do veículo" },
                    { nome: "data_inicio_prevista", tipo: "TEXT", notNull: true, descricao: "Data prevista de retirada" },
                    { nome: "data_fim_prevista", tipo: "TEXT", notNull: true, descricao: "Data prevista de devolução" }
                ]
            },
            {
                nome: "Locacoes",
                atributos: [
                    { nome: "locacao_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "reserva_id", tipo: "INTEGER", fk: "Reservas", unique: true, descricao: "ID da reserva (opcional)" },
                    { nome: "cliente_cnh", tipo: "TEXT", fk: "Clientes", notNull: true, descricao: "CNH do cliente" },
                    { nome: "veiculo_placa", tipo: "TEXT", fk: "Veiculos", notNull: true, descricao: "Placa do veículo" },
                    { nome: "data_retirada", tipo: "TEXT", notNull: true, descricao: "Data de retirada" },
                    { nome: "data_devolucao", tipo: "TEXT", descricao: "Data de devolução" },
                    { nome: "valor_total", tipo: "REAL", descricao: "Valor total" },
                    { nome: "km_retirada", tipo: "INTEGER", descricao: "Quilometragem na retirada" },
                    { nome: "km_devolucao", tipo: "INTEGER", descricao: "Quilometragem na devolução" }
                ]
            },
            {
                nome: "Manutencoes",
                atributos: [
                    { nome: "manutencao_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "veiculo_placa", tipo: "TEXT", fk: "Veiculos", notNull: true, descricao: "Placa do veículo" },
                    { nome: "data_manutencao", tipo: "TEXT", notNull: true, descricao: "Data da manutenção" },
                    { nome: "tipo", tipo: "TEXT", notNull: true, descricao: "Tipo (Preventiva, Corretiva)" },
                    { nome: "custo", tipo: "REAL", descricao: "Custo da manutenção" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Clientes", para: "Reservas", tipo: "1:N", descricao: "Um cliente faz múltiplas reservas" },
            { de: "Veiculos", para: "Reservas", tipo: "1:N", descricao: "Um veículo é reservado múltiplas vezes" },
            { de: "Clientes", para: "Locacoes", tipo: "1:N", descricao: "Um cliente realiza múltiplas locações" },
            { de: "Veiculos", para: "Locacoes", tipo: "1:N", descricao: "Um veículo é locado múltiplas vezes" },
            { de: "Reservas", para: "Locacoes", tipo: "1:1", descricao: "Uma reserva pode se concretizar em uma locação" },
            { de: "Veiculos", para: "Manutencoes", tipo: "1:N", descricao: "Um veículo passa por múltiplas manutenções" }
        ],
        diagramaMermaid: `erDiagram
    Clientes {
        TEXT cnh PK
        TEXT nome
        TEXT telefone
        TEXT endereco
    }
    Veiculos {
        TEXT placa PK
        TEXT modelo
        TEXT marca
        INTEGER ano
        TEXT cor
        TEXT status
    }
    Reservas {
        INTEGER reserva_id PK
        TEXT cliente_cnh FK
        TEXT veiculo_placa FK
        TEXT data_inicio_prevista
        TEXT data_fim_prevista
    }
    Locacoes {
        INTEGER locacao_id PK
        INTEGER reserva_id FK
        TEXT cliente_cnh FK
        TEXT veiculo_placa FK
        TEXT data_retirada
        TEXT data_devolucao
        REAL valor_total
    }
    Manutencoes {
        INTEGER manutencao_id PK
        TEXT veiculo_placa FK
        TEXT data_manutencao
        TEXT tipo
        REAL custo
    }

    Clientes ||--|{ Reservas : "faz"
    Veiculos ||--|{ Reservas : "é reservado em"
    Clientes ||--|{ Locacoes : "realiza"
    Veiculos ||--|{ Locacoes : "é locado em"
    Reservas |o--|| Locacoes : "concretiza-se em"
    Veiculos ||--|{ Manutencoes : "passa por"`,
        sqlPath: "sql/7_locadora.sql",
        sqlContent: `-- sql/7_locadora.sql

CREATE TABLE Clientes (
    cnh TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    telefone TEXT,
    endereco TEXT
);

CREATE TABLE Veiculos (
    placa TEXT PRIMARY KEY,
    modelo TEXT NOT NULL,
    marca TEXT NOT NULL,
    ano INTEGER,
    cor TEXT,
    status TEXT NOT NULL CHECK(status IN ('Disponível', 'Locado', 'Em Manutenção'))
);

CREATE TABLE Reservas (
    reserva_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_cnh TEXT NOT NULL,
    veiculo_placa TEXT NOT NULL,
    data_inicio_prevista TEXT NOT NULL,
    data_fim_prevista TEXT NOT NULL,
    FOREIGN KEY (cliente_cnh) REFERENCES Clientes(cnh),
    FOREIGN KEY (veiculo_placa) REFERENCES Veiculos(placa)
);

CREATE TABLE Locacoes (
    locacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reserva_id INTEGER UNIQUE, -- Uma reserva gera no máximo uma locação
    cliente_cnh TEXT NOT NULL,
    veiculo_placa TEXT NOT NULL,
    data_retirada TEXT NOT NULL,
    data_devolucao TEXT,
    valor_total REAL,
    km_retirada INTEGER,
    km_devolucao INTEGER,
    FOREIGN KEY (reserva_id) REFERENCES Reservas(reserva_id),
    FOREIGN KEY (cliente_cnh) REFERENCES Clientes(cnh),
    FOREIGN KEY (veiculo_placa) REFERENCES Veiculos(placa)
);

CREATE TABLE Manutencoes (
    manutencao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    veiculo_placa TEXT NOT NULL,
    data_manutencao TEXT NOT NULL,
    tipo TEXT NOT NULL,
    custo REAL,
    FOREIGN KEY (veiculo_placa) REFERENCES Veiculos(placa)
);`
    },
    {
        id: 8,
        nome: "Sistema de Vendas",
        complexidade: "Alta",
        descricao: "Sistema de vendas com vendedores e comissões. Demonstra cálculos derivados e armazenamento de valores históricos.",
        padroes: [
            "Armazenamento de dados calculados (comissões)",
            "Registro histórico imutável de transações",
            "Relacionamento N:M com múltiplos atributos"
        ],
        entidades: [
            {
                nome: "Vendedores",
                atributos: [
                    { nome: "vendedor_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "comissao_percentual", tipo: "REAL", notNull: true, descricao: "Percentual de comissão (ex: 0.05 para 5%)" }
                ]
            },
            {
                nome: "Clientes",
                atributos: [
                    { nome: "cliente_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "limite_credito", tipo: "REAL", descricao: "Limite de crédito" }
                ]
            },
            {
                nome: "Produtos",
                atributos: [
                    { nome: "produto_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome do produto" },
                    { nome: "preco", tipo: "REAL", notNull: true, descricao: "Preço atual" },
                    { nome: "estoque", tipo: "INTEGER", notNull: true, descricao: "Quantidade em estoque" }
                ]
            },
            {
                nome: "Vendas",
                atributos: [
                    { nome: "venda_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "vendedor_id", tipo: "INTEGER", fk: "Vendedores", notNull: true, descricao: "ID do vendedor" },
                    { nome: "cliente_id", tipo: "INTEGER", fk: "Clientes", notNull: true, descricao: "ID do cliente" },
                    { nome: "data_venda", tipo: "TEXT", notNull: true, descricao: "Data da venda" },
                    { nome: "valor_total", tipo: "REAL", notNull: true, descricao: "Valor total" },
                    { nome: "valor_comissao", tipo: "REAL", notNull: true, descricao: "Valor da comissão (armazenado)" }
                ]
            },
            {
                nome: "VendaItens",
                atributos: [
                    { nome: "venda_id", tipo: "INTEGER", pk: true, fk: "Vendas", notNull: true, descricao: "ID da venda" },
                    { nome: "produto_id", tipo: "INTEGER", pk: true, fk: "Produtos", notNull: true, descricao: "ID do produto" },
                    { nome: "quantidade", tipo: "INTEGER", notNull: true, descricao: "Quantidade vendida" },
                    { nome: "preco_unitario", tipo: "REAL", notNull: true, descricao: "Preço no momento da venda" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Vendedores", para: "Vendas", tipo: "1:N", descricao: "Um vendedor realiza múltiplas vendas" },
            { de: "Clientes", para: "Vendas", tipo: "1:N", descricao: "Um cliente compra em múltiplas vendas" },
            { de: "Vendas", para: "Produtos", tipo: "N:M", descricao: "Uma venda contém vários produtos, um produto está em várias vendas" }
        ],
        diagramaMermaid: `erDiagram
    Vendedores {
        INTEGER vendedor_id PK
        TEXT nome
        REAL comissao_percentual
    }
    Clientes {
        INTEGER cliente_id PK
        TEXT nome
        REAL limite_credito
    }
    Produtos {
        INTEGER produto_id PK
        TEXT nome
        REAL preco
        INTEGER estoque
    }
    Vendas {
        INTEGER venda_id PK
        INTEGER vendedor_id FK
        INTEGER cliente_id FK
        TEXT data_venda
        REAL valor_total
        REAL valor_comissao
    }
    VendaItens {
        INTEGER venda_id PK, FK
        INTEGER produto_id PK, FK
        INTEGER quantidade
        REAL preco_unitario
    }

    Vendedores ||--|{ Vendas : "realiza"
    Clientes ||--|{ Vendas : "compra em"
    Vendas }o--o{ Produtos : "contém"
    VendaItens }o--|| Vendas : "detalha"
    VendaItens }o--|| Produtos : "detalha"`,
        sqlPath: "sql/8_vendas.sql",
        sqlContent: `-- sql/8_vendas.sql

CREATE TABLE Vendedores (
    vendedor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    comissao_percentual REAL NOT NULL CHECK(comissao_percentual >= 0 AND comissao_percentual <= 1)
);

CREATE TABLE Clientes (
    cliente_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    limite_credito REAL DEFAULT 0.0
);

CREATE TABLE Produtos (
    produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    estoque INTEGER NOT NULL
);

CREATE TABLE Vendas (
    venda_id INTEGER PRIMARY KEY AUTOINCREMENT,
    vendedor_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    data_venda TEXT NOT NULL,
    valor_total REAL NOT NULL,
    valor_comissao REAL NOT NULL, -- Armazena o valor da comissão no momento da venda
    FOREIGN KEY (vendedor_id) REFERENCES Vendedores(vendedor_id),
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id)
);

CREATE TABLE VendaItens (
    venda_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario REAL NOT NULL,
    FOREIGN KEY (venda_id) REFERENCES Vendas(venda_id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id),
    PRIMARY KEY (venda_id, produto_id)
);`
    },
    {
        id: 9,
        nome: "Sistema Universitário",
        complexidade: "Alta",
        descricao: "Sistema universitário completo com cursos e pré-requisitos. Demonstra auto-relacionamento complexo.",
        padroes: [
            "Auto-relacionamento (Disciplina → Pré-requisito)",
            "Relacionamento reflexivo complexo",
            "Múltiplas tabelas de junção inter-relacionadas"
        ],
        entidades: [
            {
                nome: "Alunos",
                atributos: [
                    { nome: "matricula", tipo: "TEXT", pk: true, descricao: "Matrícula do aluno" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "data_nascimento", tipo: "TEXT", descricao: "Data de nascimento" }
                ]
            },
            {
                nome: "Professores",
                atributos: [
                    { nome: "matricula", tipo: "TEXT", pk: true, descricao: "Matrícula do professor" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "titulacao", tipo: "TEXT", descricao: "Titulação (Mestre, Doutor)" }
                ]
            },
            {
                nome: "Cursos",
                atributos: [
                    { nome: "codigo", tipo: "TEXT", pk: true, descricao: "Código do curso" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome do curso" },
                    { nome: "duracao", tipo: "INTEGER", descricao: "Duração em semestres" }
                ]
            },
            {
                nome: "Disciplinas",
                atributos: [
                    { nome: "codigo", tipo: "TEXT", pk: true, descricao: "Código da disciplina" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome da disciplina" },
                    { nome: "carga_horaria", tipo: "INTEGER", notNull: true, descricao: "Carga horária" }
                ]
            },
            {
                nome: "Prerequisitos",
                atributos: [
                    { nome: "disciplina_codigo", tipo: "TEXT", pk: true, fk: "Disciplinas", notNull: true, descricao: "Disciplina que TEM o pré-requisito" },
                    { nome: "prerequisito_codigo", tipo: "TEXT", pk: true, fk: "Disciplinas", notNull: true, descricao: "Disciplina que É o pré-requisito" }
                ]
            },
            {
                nome: "CursoDisciplina",
                atributos: [
                    { nome: "curso_codigo", tipo: "TEXT", pk: true, fk: "Cursos", notNull: true, descricao: "Código do curso" },
                    { nome: "disciplina_codigo", tipo: "TEXT", pk: true, fk: "Disciplinas", notNull: true, descricao: "Código da disciplina" }
                ]
            },
            {
                nome: "Matriculas",
                atributos: [
                    { nome: "aluno_matricula", tipo: "TEXT", pk: true, fk: "Alunos", notNull: true, descricao: "Matrícula do aluno" },
                    { nome: "disciplina_codigo", tipo: "TEXT", pk: true, fk: "Disciplinas", notNull: true, descricao: "Código da disciplina" },
                    { nome: "semestre", tipo: "TEXT", pk: true, notNull: true, descricao: "Semestre (ex: 2024.1)" },
                    { nome: "nota", tipo: "REAL", descricao: "Nota do aluno" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Alunos", para: "Disciplinas", tipo: "N:M", descricao: "Um aluno se matricula em várias disciplinas" },
            { de: "Cursos", para: "Disciplinas", tipo: "N:M", descricao: "Um curso é composto por várias disciplinas" },
            { de: "Disciplinas", para: "Disciplinas", tipo: "N:M (auto-relacionamento)", descricao: "Uma disciplina pode ter várias outras como pré-requisito" }
        ],
        diagramaMermaid: `erDiagram
    Alunos {
        TEXT matricula PK
        TEXT nome
    }
    Cursos {
        TEXT codigo PK
        TEXT nome
        INTEGER duracao
    }
    Disciplinas {
        TEXT codigo PK
        TEXT nome
        INTEGER carga_horaria
    }
    Matriculas {
        TEXT aluno_matricula PK, FK
        TEXT disciplina_codigo PK, FK
        REAL nota
        TEXT semestre
    }
    CursoDisciplina {
        TEXT curso_codigo PK, FK
        TEXT disciplina_codigo PK, FK
    }
    Prerequisitos {
        TEXT disciplina_codigo PK, FK
        TEXT prerequisito_codigo PK, FK
    }

    Alunos }o--o{ Disciplinas : "se matricula em"
    Cursos }o--o{ Disciplinas : "é composto por"
    Disciplinas }o--o{ Disciplinas : "tem como pré-requisito"

    Matriculas }o--|| Alunos : "de"
    Matriculas }o--|| Disciplinas : "em"
    CursoDisciplina }o--|| Cursos : "de"
    CursoDisciplina }o--|| Disciplinas : "em"
    Prerequisitos }o--|| Disciplinas : "requer"
    Prerequisitos }o--|| Disciplinas : "é requerido por"`,
        sqlPath: "sql/9_universidade.sql",
        sqlContent: `-- sql/9_universidade.sql

CREATE TABLE Alunos (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    data_nascimento TEXT
);

CREATE TABLE Professores (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    titulacao TEXT -- Ex: 'Mestre', 'Doutor'
);

CREATE TABLE Cursos (
    codigo TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    duracao INTEGER -- Em semestres
);

CREATE TABLE Disciplinas (
    codigo TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    carga_horaria INTEGER NOT NULL
);

-- Tabela de junção para o auto-relacionamento de pré-requisitos
CREATE TABLE Prerequisitos (
    disciplina_codigo TEXT NOT NULL, -- A disciplina que TEM o pré-requisito
    prerequisito_codigo TEXT NOT NULL, -- A disciplina que É o pré-requisito
    FOREIGN KEY (disciplina_codigo) REFERENCES Disciplinas(codigo),
    FOREIGN KEY (prerequisito_codigo) REFERENCES Disciplinas(codigo),
    PRIMARY KEY (disciplina_codigo, prerequisito_codigo)
);

-- Tabela de junção para compor o currículo dos cursos
CREATE TABLE CursoDisciplina (
    curso_codigo TEXT NOT NULL,
    disciplina_codigo TEXT NOT NULL,
    FOREIGN KEY (curso_codigo) REFERENCES Cursos(codigo),
    FOREIGN KEY (disciplina_codigo) REFERENCES Disciplinas(codigo),
    PRIMARY KEY (curso_codigo, disciplina_codigo)
);

-- Tabela de junção para as matrículas dos alunos, incluindo notas
CREATE TABLE Matriculas (
    aluno_matricula TEXT NOT NULL,
    disciplina_codigo TEXT NOT NULL,
    semestre TEXT NOT NULL, -- Ex: '2024.1'
    nota REAL,
    FOREIGN KEY (aluno_matricula) REFERENCES Alunos(matricula),
    FOREIGN KEY (disciplina_codigo) REFERENCES Disciplinas(codigo),
    PRIMARY KEY (aluno_matricula, disciplina_codigo, semestre)
);`
    },
    {
        id: 10,
        nome: "Sistema Hospitalar Completo",
        complexidade: "Alta",
        descricao: "Sistema hospitalar integrado com consultas, internações e exames. Demonstra integração de múltiplos subdomínios.",
        padroes: [
            "Integração de múltiplos subdomínios",
            "Relacionamentos opcionais complexos",
            "Gestão de recursos compartilhados (leitos)"
        ],
        entidades: [
            {
                nome: "Pacientes",
                atributos: [
                    { nome: "paciente_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "data_nascimento", tipo: "TEXT", descricao: "Data de nascimento" },
                    { nome: "plano_saude", tipo: "TEXT", descricao: "Plano de saúde" }
                ]
            },
            {
                nome: "Medicos",
                atributos: [
                    { nome: "crm", tipo: "TEXT", pk: true, descricao: "CRM do médico" },
                    { nome: "nome", tipo: "TEXT", notNull: true, descricao: "Nome completo" },
                    { nome: "especialidade", tipo: "TEXT", descricao: "Especialidade médica" }
                ]
            },
            {
                nome: "Quartos",
                atributos: [
                    { nome: "quarto_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "numero", tipo: "TEXT", notNull: true, unique: true, descricao: "Número do quarto" },
                    { nome: "tipo", tipo: "TEXT", descricao: "Tipo (Apartamento, Enfermaria)" }
                ]
            },
            {
                nome: "Leitos",
                atributos: [
                    { nome: "leito_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "quarto_id", tipo: "INTEGER", fk: "Quartos", notNull: true, descricao: "ID do quarto" },
                    { nome: "status", tipo: "TEXT", notNull: true, descricao: "Status (Livre, Ocupado, Manutenção)" }
                ]
            },
            {
                nome: "Consultas",
                atributos: [
                    { nome: "consulta_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "paciente_id", tipo: "INTEGER", fk: "Pacientes", notNull: true, descricao: "ID do paciente" },
                    { nome: "medico_crm", tipo: "TEXT", fk: "Medicos", notNull: true, descricao: "CRM do médico" },
                    { nome: "data_hora", tipo: "TEXT", notNull: true, descricao: "Data e hora" },
                    { nome: "diagnostico", tipo: "TEXT", descricao: "Diagnóstico" }
                ]
            },
            {
                nome: "Internacoes",
                atributos: [
                    { nome: "internacao_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "paciente_id", tipo: "INTEGER", fk: "Pacientes", notNull: true, descricao: "ID do paciente" },
                    { nome: "leito_id", tipo: "INTEGER", fk: "Leitos", notNull: true, descricao: "ID do leito" },
                    { nome: "data_entrada", tipo: "TEXT", notNull: true, descricao: "Data de entrada" },
                    { nome: "data_alta_prevista", tipo: "TEXT", descricao: "Previsão de alta" },
                    { nome: "data_alta_efetiva", tipo: "TEXT", descricao: "Data real da alta" }
                ]
            },
            {
                nome: "Exames",
                atributos: [
                    { nome: "exame_id", tipo: "INTEGER", pk: true, autoIncrement: true, descricao: "ID único" },
                    { nome: "paciente_id", tipo: "INTEGER", fk: "Pacientes", notNull: true, descricao: "ID do paciente" },
                    { nome: "consulta_id", tipo: "INTEGER", fk: "Consultas", descricao: "ID da consulta (opcional)" },
                    { nome: "internacao_id", tipo: "INTEGER", fk: "Internacoes", descricao: "ID da internação (opcional)" },
                    { nome: "tipo_exame", tipo: "TEXT", notNull: true, descricao: "Nome do exame" },
                    { nome: "data_solicitacao", tipo: "TEXT", notNull: true, descricao: "Data da solicitação" },
                    { nome: "resultado", tipo: "TEXT", descricao: "Resultado do exame" }
                ]
            }
        ],
        relacionamentos: [
            { de: "Pacientes", para: "Consultas", tipo: "1:N", descricao: "Um paciente tem múltiplas consultas" },
            { de: "Medicos", para: "Consultas", tipo: "1:N", descricao: "Um médico atende em múltiplas consultas" },
            { de: "Pacientes", para: "Internacoes", tipo: "1:N", descricao: "Um paciente pode ter múltiplas internações" },
            { de: "Leitos", para: "Internacoes", tipo: "1:N", descricao: "Um leito é ocupado em múltiplas internações ao longo do tempo" },
            { de: "Quartos", para: "Leitos", tipo: "1:N", descricao: "Um quarto contém múltiplos leitos" },
            { de: "Consultas", para: "Exames", tipo: "1:N (opcional)", descricao: "Uma consulta pode solicitar múltiplos exames" },
            { de: "Internacoes", para: "Exames", tipo: "1:N (opcional)", descricao: "Uma internação pode solicitar múltiplos exames" },
            { de: "Pacientes", para: "Exames", tipo: "1:N", descricao: "Um paciente realiza múltiplos exames" }
        ],
        diagramaMermaid: `erDiagram
    Pacientes {
        INTEGER paciente_id PK
        TEXT nome
        TEXT data_nascimento
    }
    Medicos {
        TEXT crm PK
        TEXT nome
        TEXT especialidade
    }
    Quartos {
        INTEGER quarto_id PK
        TEXT numero
        TEXT tipo
    }
    Leitos {
        INTEGER leito_id PK
        INTEGER quarto_id FK
        TEXT status
    }
    Consultas {
        INTEGER consulta_id PK
        INTEGER paciente_id FK
        TEXT medico_crm FK
        TEXT data_hora
    }
    Internacoes {
        INTEGER internacao_id PK
        INTEGER paciente_id FK
        INTEGER leito_id FK
        TEXT data_entrada
        TEXT data_alta_efetiva
    }
    Exames {
        INTEGER exame_id PK
        INTEGER paciente_id FK
        INTEGER consulta_id FK
        INTEGER internacao_id FK
        TEXT tipo_exame
        TEXT resultado
    }

    Pacientes ||--|{ Consultas : "tem"
    Medicos ||--|{ Consultas : "atende em"
    Pacientes ||--|{ Internacoes : "é internado em"
    Leitos ||--|{ Internacoes : "ocupa"
    Quartos ||--|{ Leitos : "contém"
    Consultas |o--|{ Exames : "solicita"
    Internacoes |o--|{ Exames : "solicita"
    Pacientes ||--|{ Exames : "realiza"`,
        sqlPath: "sql/10_hospitalar.sql",
        sqlContent: `-- sql/10_hospitalar.sql

CREATE TABLE Pacientes (
    paciente_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_nascimento TEXT,
    plano_saude TEXT
);

CREATE TABLE Medicos (
    crm TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    especialidade TEXT
);

CREATE TABLE Quartos (
    quarto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL UNIQUE,
    tipo TEXT
);

CREATE TABLE Leitos (
    leito_id INTEGER PRIMARY KEY AUTOINCREMENT,
    quarto_id INTEGER NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Livre', 'Ocupado', 'Manutenção')),
    FOREIGN KEY (quarto_id) REFERENCES Quartos(quarto_id)
);

CREATE TABLE Consultas (
    consulta_id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    medico_crm TEXT NOT NULL,
    data_hora TEXT NOT NULL,
    diagnostico TEXT,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(paciente_id),
    FOREIGN KEY (medico_crm) REFERENCES Medicos(crm)
);

CREATE TABLE Internacoes (
    internacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    leito_id INTEGER NOT NULL,
    data_entrada TEXT NOT NULL,
    data_alta_prevista TEXT,
    data_alta_efetiva TEXT,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(paciente_id),
    FOREIGN KEY (leito_id) REFERENCES Leitos(leito_id)
);

CREATE TABLE Exames (
    exame_id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    consulta_id INTEGER, -- Pode ser nulo
    internacao_id INTEGER, -- Pode ser nulo
    tipo_exame TEXT NOT NULL,
    data_solicitacao TEXT NOT NULL,
    resultado TEXT,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(paciente_id),
    FOREIGN KEY (consulta_id) REFERENCES Consultas(consulta_id),
    FOREIGN KEY (internacao_id) REFERENCES Internacoes(internacao_id),
    -- Garante que o exame está ligado a uma consulta OU a uma internação, mas não a ambos.
    CHECK ( (consulta_id IS NOT NULL AND internacao_id IS NULL) OR (consulta_id IS NULL AND internacao_id IS NOT NULL) )
);`
    }
];

// Exporta para uso global
if (typeof window !== 'undefined') {
    window.CONTEXTOS_DATA = CONTEXTOS_DATA;
}