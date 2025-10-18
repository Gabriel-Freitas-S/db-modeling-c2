/*
================================================================================
SISTEMA BÁSICO DE BIBLIOTECA - MODELO RELACIONAL
================================================================================

CONTEXTO: Sistema Básico de Biblioteca (Baixa Complexidade)
OBJETIVO: Controlar livros, exemplares físicos, usuários e empréstimos

ENUNCIADO:
Uma biblioteca municipal precisa de um sistema para controlar seus livros e 
empréstimos. Cada livro possui um ISBN, título, autor, editora e ano de 
publicação. Os usuários da biblioteca possuem um ID, nome, telefone e e-mail. 
Um empréstimo registra qual usuário pegou qual livro e as datas de retirada 
e de devolução prevista. Um livro pode ter múltiplas cópias físicas (exemplares), 
e cada exemplar possui um número de identificação único.

ENTIDADES IDENTIFICADAS:
1. Livros - Informações bibliográficas compartilhadas
2. Exemplares - Cópias físicas individuais com controle de status
3. Usuarios - Membros cadastrados da biblioteca
4. Emprestimos - Transações de empréstimo com controle temporal

RELACIONAMENTOS:
- Livros (1) ↔ (N) Exemplares: Um livro pode ter várias cópias
- Usuarios (1) ↔ (N) Emprestimos: Um usuário pode ter vários empréstimos
- Exemplares (1) ↔ (N) Emprestimos: Um exemplar pode ter histórico de empréstimos

PADRÕES APLICADOS:
- Normalização 3FN
- Constraints de integridade referencial
- Validação de status e datas
- Chaves primárias e estrangeiras apropriadas

AUTOR: Gabriel Freitas Souza, Roberli Schuina Silva
DATA: Outubro 2025
================================================================================
*/

-- ============================================================================
-- TABELA: Livros
-- DESCRIÇÃO: Armazena informações bibliográficas compartilhadas entre exemplares
-- RELACIONAMENTOS: 1:N com Exemplares
-- ============================================================================

CREATE TABLE Livros (
    -- Chave primária: ISBN (International Standard Book Number)
    -- Formato padrão internacional para identificação de livros
    isbn TEXT PRIMARY KEY,
    
    -- Título do livro - campo obrigatório
    -- Ex: "Dom Casmurro", "O Cortiço", "1984"
    titulo TEXT NOT NULL,
    
    -- Nome do autor ou autores principais
    -- Ex: "Machado de Assis", "George Orwell"
    autor TEXT NOT NULL,
    
    -- Nome da editora responsável pela publicação
    -- Ex: "Companhia das Letras", "Abril Cultural"
    editora TEXT,
    
    -- Ano de publicação da edição
    -- Validação: deve ser um ano válido (formato INTEGER)
    ano_publicacao INTEGER
);

-- ============================================================================
-- TABELA: Exemplares  
-- DESCRIÇÃO: Representa cada cópia física individual de um livro
-- RELACIONAMENTOS: N:1 com Livros, 1:N com Emprestimos
-- ============================================================================

CREATE TABLE Exemplares (
    -- Chave primária: ID único autoincremento para cada exemplar
    exemplar_id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Chave estrangeira: Referencia o livro ao qual este exemplar pertence
    -- Permite que um mesmo livro tenha múltiplas cópias físicas
    livro_isbn TEXT NOT NULL,
    
    -- Status atual do exemplar - campo obrigatório e controlado
    -- Valores permitidos: 'DISPONÍVEL', 'EMPRESTADO', 'MANUTENÇÃO'
    -- UPPER() garante padronização em maiúsculo
    status TEXT NOT NULL CHECK(UPPER(status) IN ('DISPONÍVEL', 'EMPRESTADO', 'MANUTENÇÃO')),
    
    -- Constraint de integridade referencial
    -- Garante que todo exemplar está associado a um livro válido
    -- ON DELETE CASCADE: Se livro for excluído, exemplares também são
    FOREIGN KEY (livro_isbn) REFERENCES Livros(isbn) ON DELETE CASCADE
);

-- ============================================================================
-- TABELA: Usuarios
-- DESCRIÇÃO: Cadastro de membros da biblioteca
-- RELACIONAMENTOS: 1:N com Emprestimos
-- ============================================================================

CREATE TABLE Usuarios (
    -- Chave primária: ID único autoincremento
    usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Nome completo do usuário - campo obrigatório
    -- Ex: "João Silva Santos", "Maria Oliveira"
    nome TEXT NOT NULL,
    
    -- Telefone para contato - opcional
    -- Ex: "(11) 98765-4321", "11-2345-6789"
    telefone TEXT,
    
    -- E-mail único para cada usuário - obrigatório
    -- Constraint UNIQUE impede duplicação de e-mails
    -- Ex: "joao.silva@email.com"
    email TEXT NOT NULL UNIQUE
);

-- ============================================================================
-- TABELA: Emprestimos
-- DESCRIÇÃO: Registro das transações de empréstimo de exemplares
-- RELACIONAMENTOS: N:1 com Exemplares, N:1 com Usuarios
-- ============================================================================

CREATE TABLE Emprestimos (
    -- Chave primária: ID único autoincremento para cada empréstimo
    emprestimo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Chave estrangeira: Exemplar que está sendo emprestado
    -- Permite rastrear qual cópia específica foi emprestada
    exemplar_id INTEGER NOT NULL,
    
    -- Chave estrangeira: Usuário que realizou o empréstimo
    usuario_id INTEGER NOT NULL,
    
    -- Data e hora da retirada - obrigatória
    -- Formato ISO 8601: 'YYYY-MM-DD HH:MM:SS'
    -- CHECK garante formato válido de data
    data_retirada TEXT NOT NULL CHECK(DATE(data_retirada) IS NOT NULL),
    
    -- Data prevista para devolução - obrigatória
    -- Calculada normalmente como data_retirada + prazo padrão (ex: 14 dias)
    data_devolucao_prevista TEXT NOT NULL CHECK(DATE(data_devolucao_prevista) IS NOT NULL),
    
    -- Data real de devolução - opcional (NULL enquanto não devolvido)
    -- Quando preenchida, indica que o empréstimo foi finalizado
    -- CHECK permite NULL ou data válida
    data_devolucao_real TEXT CHECK(data_devolucao_real IS NULL OR DATE(data_devolucao_real) IS NOT NULL),
    
    -- Constraints de integridade referencial
    -- ON DELETE CASCADE: Se exemplar/usuário for excluído, empréstimos também são
    FOREIGN KEY (exemplar_id) REFERENCES Exemplares(exemplar_id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE
);

-- ============================================================================
-- COMENTÁRIOS ADICIONAIS SOBRE O MODELO
-- ============================================================================

/*
BUSINESS RULES IMPLEMENTADAS:

1. CONTROLE DE EXEMPLARES:
   - Cada livro pode ter múltiplas cópias físicas (exemplares)
   - Cada exemplar é rastreado individualmente
   - Status controlado impede inconsistências

2. CONTROLE DE EMPRÉSTIMOS:
   - Histórico completo de empréstimos por exemplar
   - Controle temporal com datas de retirada e devolução
   - Permite identificar atrasos (data_devolucao_real > data_devolucao_prevista)

3. INTEGRIDADE REFERENCIAL:
   - Não é possível emprestar exemplar inexistente
   - Não é possível emprestar para usuário não cadastrado
   - Exclusão em cascata mantém consistência

CONSULTAS TÍPICAS SUPORTADAS:
- Livros disponíveis para empréstimo
- Histórico de empréstimos de um usuário
- Exemplares em atraso
- Relatório de popularidade de livros

EXTENSÕES FUTURAS POSSÍVEIS:
- Tabela de Reservas para exemplares emprestados
- Tabela de Multas por atraso
- Tabela de Categorias/Gêneros de livros
- Sistema de renovação de empréstimos
*/