-- sql/9_universidade.sql

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
);