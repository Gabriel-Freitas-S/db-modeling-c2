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
);