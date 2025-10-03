-- sql/10_hospitalar.sql

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
);