-- sql/5_rede_social.sql

CREATE TABLE Usuarios (
    usuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_usuario TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    data_cadastro TEXT NOT NULL
);

CREATE TABLE Albuns (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_criacao TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE Fotos (
    foto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER NOT NULL,
    url_imagem TEXT NOT NULL UNIQUE,
    titulo TEXT,
    data_upload TEXT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES Albuns(album_id)
);

CREATE TABLE Comentarios (
    comentario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    foto_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    texto TEXT NOT NULL,
    data_comentario TEXT NOT NULL,
    FOREIGN KEY (foto_id) REFERENCES Fotos(foto_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabela de junção para o relacionamento N:M de curtidas
CREATE TABLE Curtidas (
    usuario_id INTEGER NOT NULL,
    foto_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (foto_id) REFERENCES Fotos(foto_id),
    PRIMARY KEY (usuario_id, foto_id)
);