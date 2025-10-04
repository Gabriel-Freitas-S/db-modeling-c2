-- sql/3_clinica.sql

CREATE TABLE Medicos (
    crm TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    telefone TEXT
);

CREATE TABLE Pacientes (
    cpf TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    data_nascimento TEXT NOT NULL CHECK(DATE(data_nascimento) IS NOT NULL),
    telefone TEXT
);

CREATE TABLE Consultas (
    consulta_id INTEGER PRIMARY KEY AUTOINCREMENT,
    medico_crm TEXT NOT NULL,
    paciente_cpf TEXT NOT NULL,
    data_hora TEXT NOT NULL UNIQUE CHECK(DATE(data_hora) IS NOT NULL), -- Uma consulta por data/hora
    valor REAL CHECK(valor IS NULL OR valor >= 0),
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
);