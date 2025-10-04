-- sql/4_ecommerce.sql

CREATE TABLE Clientes (
    cpf TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    endereco TEXT
);

CREATE TABLE Produtos (
    produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL CHECK(preco >= 0),
    estoque INTEGER NOT NULL CHECK(estoque >= 0)
);

CREATE TABLE Pedidos (
    pedido_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_cpf TEXT NOT NULL,
    data_pedido TEXT NOT NULL CHECK(DATE(data_pedido) IS NOT NULL),
    status TEXT NOT NULL CHECK(UPPER(status) IN ('PENDENTE', 'PROCESSANDO', 'ENVIADO', 'ENTREGUE', 'CANCELADO')),
    FOREIGN KEY (cliente_cpf) REFERENCES Clientes(cpf)
);

-- Tabela de junção para os itens de um pedido (relacionamento N:M com atributos)
CREATE TABLE PedidoItens (
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL CHECK(quantidade > 0),
    preco_unitario REAL NOT NULL CHECK(preco_unitario >= 0), -- Preço no momento da compra para histórico
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id),
    FOREIGN KEY (produto_id) REFERENCES Produtos(produto_id),
    PRIMARY KEY (pedido_id, produto_id)
);