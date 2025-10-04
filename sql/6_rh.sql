-- sql/6_rh.sql

CREATE TABLE Funcionarios (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    data_admissao TEXT NOT NULL CHECK(DATE(data_admissao) IS NOT NULL)
);

CREATE TABLE Departamentos (
    depto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
);

CREATE TABLE Cargos (
    cargo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    salario_base REAL NOT NULL CHECK(salario_base >= 0)
);

-- Tabela para registrar o histórico de alocações de funcionários
CREATE TABLE HistoricoAlocacoes (
    historico_id INTEGER PRIMARY KEY AUTOINCREMENT,
    funcionario_matricula TEXT NOT NULL,
    departamento_id INTEGER NOT NULL,
    cargo_id INTEGER NOT NULL,
    data_inicio TEXT NOT NULL CHECK(DATE(data_inicio) IS NOT NULL),
    data_fim TEXT CHECK(data_fim IS NULL OR DATE(data_fim) IS NOT NULL), -- Fica NULL para a alocação atual
    FOREIGN KEY (funcionario_matricula) REFERENCES Funcionarios(matricula),
    FOREIGN KEY (departamento_id) REFERENCES Departamentos(depto_id),
    FOREIGN KEY (cargo_id) REFERENCES Cargos(cargo_id)
);