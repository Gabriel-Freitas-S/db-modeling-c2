-- sql/1_biblioteca.sql

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
    status TEXT NOT NULL CHECK(UPPER(status) IN ('DISPONÍVEL', 'EMPRESTADO', 'MANUTENÇÃO')),
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
    data_retirada TEXT NOT NULL CHECK(DATE(data_retirada) IS NOT NULL), -- Formato: 'YYYY-MM-DD HH:MM:SS'
    data_devolucao_prevista TEXT NOT NULL CHECK(DATE(data_devolucao_prevista) IS NOT NULL),
    data_devolucao_real TEXT CHECK(data_devolucao_real IS NULL OR DATE(data_devolucao_real) IS NOT NULL), -- Nulo enquanto o livro não for devolvido
    FOREIGN KEY (exemplar_id) REFERENCES Exemplares(exemplar_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);