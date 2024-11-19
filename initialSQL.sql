-- Tabela de usuários
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('usuario', 'administrador')),
    criado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
    pagamento_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    valor NUMERIC(10, 2) NOT NULL,
    metodo_pagamento VARCHAR(20) NOT NULL CHECK (metodo_pagamento IN ('bitcoin', 'reais')),
    data_pagamento TIMESTAMP DEFAULT NOW()
);

-- Tabela de bancas
CREATE TABLE bancas (
    banca_id SERIAL PRIMARY KEY,
    nome_banca VARCHAR(255) NOT NULL
);

-- Tabela de disciplinas
CREATE TABLE disciplinas (
    disciplina_id SERIAL PRIMARY KEY,
    nome_disciplina VARCHAR(255) NOT NULL
);

-- Tabela de cargos
CREATE TABLE cargos (
    cargo_id SERIAL PRIMARY KEY,
    nome_cargo VARCHAR(255) NOT NULL
);

-- Tabela de questões
CREATE TABLE questoes (
    questao_id SERIAL PRIMARY KEY,
    questao TEXT NOT NULL,
    banca_id INT REFERENCES bancas(banca_id) ON DELETE NO ACTION,
    disciplina_id INT REFERENCES disciplinas(disciplina_id) ON DELETE NO ACTION,
    cargo_id INT REFERENCES cargos(cargo_id) ON DELETE NO ACTION,
    ano_prova INT NOT NULL,
    alternativa_correta CHAR(1) NOT NULL CHECK (alternativa_correta IN ('A', 'B', 'C', 'D', 'E')),
    -- Alternativas
    alternativa_a TEXT NOT NULL,
    alternativa_b TEXT NOT NULL,
    alternativa_c TEXT NOT NULL,
    alternativa_d TEXT NOT NULL,
    alternativa_e TEXT NOT NULL
);

-- Tabela de respostas dos usuários
CREATE TABLE respostas (
    resposta_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    questao_id INT NOT NULL REFERENCES questoes(questao_id) ON DELETE CASCADE,
    alternativa_escolhida CHAR(1) CHECK (alternativa_escolhida IN ('A', 'B', 'C', 'D', 'E')),
    correta BOOLEAN,
    data_resposta TIMESTAMP DEFAULT NOW()
);

ALTER TABLE respostas ADD COLUMN ativa BOOLEAN DEFAULT TRUE;

