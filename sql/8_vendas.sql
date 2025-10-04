-- sql/8_vendas.sql

CREATE TABLE Vendedores (
    vendedor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    comissao_percentual REAL NOT NULL CHECK(comissao_percentual >= 0 AND comissao_percentual <= 1)
);

CREATE TABLE Clientes (
    cliente_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    limite_credito REAL DEFAULT 0.0 CHECK(limite_credito >= 0)
);

CREATE TABLE Produtos (
    produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL CHECK(preco >= 0),
    estoque INTEGER NOT NULL
);

CREATE TABLE Vendas (
    venda_id INTEGER PRIMARY KEY AUTOINCREMENT,
    vendedor_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    data_venda TEXT NOT NULL CHECK(DATE(data_venda) IS NOT NULL),
    valor_total REAL NOT NULL CHECK(valor_total >= 0),
    valor_comissao REAL NOT NULL CHECK(valor_comissao >= 0), -- Armazena o valor da comissão no momento da venda
    FOREIGN KEY (vendedor_id) REFERENCES Vendedores(vendedor_id),
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id)
);

CREATE TABLE VendaItens (
    venda_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario REAL NOT NULL CHECK(preco_unitario >= 0),
    FOREIGN KEY (venda_id) REFERENCES Vendas(venda_id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id),
    PRIMARY KEY (venda_id, produto_id)
);