-- sql/7_locadora.sql

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
    status TEXT NOT NULL CHECK(UPPER(status) IN ('DISPONÍVEL', 'LOCADO', 'EM MANUTENÇÃO'))
);

CREATE TABLE Reservas (
    reserva_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_cnh TEXT NOT NULL,
    veiculo_placa TEXT NOT NULL,
    data_inicio_prevista TEXT NOT NULL CHECK(DATE(data_inicio_prevista) IS NOT NULL),
    data_fim_prevista TEXT NOT NULL CHECK(DATE(data_fim_prevista) IS NOT NULL),
    FOREIGN KEY (cliente_cnh) REFERENCES Clientes(cnh),
    FOREIGN KEY (veiculo_placa) REFERENCES Veiculos(placa)
);

CREATE TABLE Locacoes (
    locacao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reserva_id INTEGER UNIQUE, -- Uma reserva gera no máximo uma locação
    cliente_cnh TEXT NOT NULL,
    veiculo_placa TEXT NOT NULL,
    data_retirada TEXT NOT NULL CHECK(DATE(data_retirada) IS NOT NULL),
    data_devolucao TEXT CHECK(data_devolucao IS NULL OR DATE(data_devolucao) IS NOT NULL),
    valor_total REAL CHECK(valor_total IS NULL OR valor_total >= 0),
    km_retirada INTEGER,
    km_devolucao INTEGER,
    FOREIGN KEY (reserva_id) REFERENCES Reservas(reserva_id),
    FOREIGN KEY (cliente_cnh) REFERENCES Clientes(cnh),
    FOREIGN KEY (veiculo_placa) REFERENCES Veiculos(placa)
);

CREATE TABLE Manutencoes (
    manutencao_id INTEGER PRIMARY KEY AUTOINCREMENT,
    veiculo_placa TEXT NOT NULL,
    data_manutencao TEXT NOT NULL CHECK(DATE(data_manutencao) IS NOT NULL),
    tipo TEXT NOT NULL,
    custo REAL CHECK(custo IS NULL OR custo >= 0),
    FOREIGN KEY (veiculo_placa) REFERENCES Veiculos(placa)
);