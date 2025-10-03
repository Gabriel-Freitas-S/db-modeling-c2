-- sql/2_academico.sql

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
);