-- database/init.sql
-- MySQL 8+

-- =========
-- Tabelas base
-- =========

CREATE TABLE IF NOT EXISTS especialidade (
  idEspecialidade INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS combustivel (
  idCombustivel INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(45) NOT NULL,
  marca VARCHAR(45) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS relatorio (
  idRelatorio INT AUTO_INCREMENT PRIMARY KEY,
  descricao TEXT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS empresa_parceira (
  idEmpresaParceira INT AUTO_INCREMENT PRIMARY KEY,
  nomeEmpresa VARCHAR(45) NOT NULL,
  pais VARCHAR(45) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS foguete (
  idFoguete INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  combustivel_idCombustivel INT NOT NULL,
  localLancamento VARCHAR(45) NOT NULL,
  CONSTRAINT fk_foguete_combustivel
    FOREIGN KEY (combustivel_idCombustivel) REFERENCES combustivel(idCombustivel)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS astronauta (
  idAstronauta INT AUTO_INCREMENT PRIMARY KEY,
  nomeAstro VARCHAR(45) NOT NULL,
  pais VARCHAR(45) NOT NULL,
  especialidade_idEspecialidade INT NOT NULL,
  CONSTRAINT fk_astronauta_especialidade
    FOREIGN KEY (especialidade_idEspecialidade) REFERENCES especialidade(idEspecialidade)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS missao (
  idMissao INT AUTO_INCREMENT PRIMARY KEY,
  nomeMissao VARCHAR(45) NOT NULL,
  duracaoDias INT NOT NULL,
  motivo TEXT NOT NULL,

  empresaParceira_idEmpresaParceira INT NOT NULL,
  astronauta_idAstronauta INT NOT NULL,
  foguete_idFoguete INT NOT NULL,
  foguete_combustivel_idCombustivel INT NOT NULL,
  relatorio_idRelatorio INT NOT NULL,

  CONSTRAINT fk_missao_empresa
    FOREIGN KEY (empresaParceira_idEmpresaParceira) REFERENCES empresa_parceira(idEmpresaParceira)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_missao_astronauta
    FOREIGN KEY (astronauta_idAstronauta) REFERENCES astronauta(idAstronauta)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_missao_foguete
    FOREIGN KEY (foguete_idFoguete) REFERENCES foguete(idFoguete)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_missao_foguete_comb
    FOREIGN KEY (foguete_combustivel_idCombustivel) REFERENCES combustivel(idCombustivel)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_missao_relatorio
    FOREIGN KEY (relatorio_idRelatorio) REFERENCES relatorio(idRelatorio)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS oxigenio (
  idOxigenio INT AUTO_INCREMENT PRIMARY KEY,
  quantidadeAbastecida FLOAT NOT NULL,
  estado VARCHAR(45) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS estacao (
  idEstacao INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  quantidadeModulos VARCHAR(45) NOT NULL,
  estaAtiva TINYINT(1) NOT NULL DEFAULT 1,

  missao_idMissao INT NOT NULL,
  missao_empresaParceira_idEmpresaParceira INT NOT NULL,
  missao_astronauta_idAstronauta INT NOT NULL,
  missao_foguete_idFoguete INT NOT NULL,
  missao_foguete_combustivel_idCombustivel INT NOT NULL,

  temperatura FLOAT NOT NULL,
  oxigenio_idOxigenio INT NOT NULL,

  CONSTRAINT fk_estacao_missao
    FOREIGN KEY (missao_idMissao) REFERENCES missao(idMissao)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_estacao_empresa
    FOREIGN KEY (missao_empresaParceira_idEmpresaParceira) REFERENCES empresa_parceira(idEmpresaParceira)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_estacao_astronauta
    FOREIGN KEY (missao_astronauta_idAstronauta) REFERENCES astronauta(idAstronauta)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_estacao_foguete
    FOREIGN KEY (missao_foguete_idFoguete) REFERENCES foguete(idFoguete)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_estacao_foguete_comb
    FOREIGN KEY (missao_foguete_combustivel_idCombustivel) REFERENCES combustivel(idCombustivel)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,

  CONSTRAINT fk_estacao_oxigenio
    FOREIGN KEY (oxigenio_idOxigenio) REFERENCES oxigenio(idOxigenio)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Tabela de login (sem telas por enquanto)
CREATE TABLE IF NOT EXISTS login (
  idLogin INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  senha VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Índices úteis
CREATE INDEX idx_astronauta_especialidade ON astronauta(especialidade_idEspecialidade);
CREATE INDEX idx_foguete_combustivel ON foguete(combustivel_idCombustivel);
CREATE INDEX idx_missao_empresa ON missao(empresaParceira_idEmpresaParceira);
CREATE INDEX idx_missao_astronauta ON missao(astronauta_idAstronauta);
CREATE INDEX idx_missao_foguete ON missao(foguete_idFoguete);
CREATE INDEX idx_missao_relatorio ON missao(relatorio_idRelatorio);
CREATE INDEX idx_estacao_missao ON estacao(missao_idMissao);
CREATE INDEX idx_estacao_oxigenio ON estacao(oxigenio_idOxigenio);

-- =========
-- Registros iniciais (Seed)
-- =========

INSERT INTO especialidade (nome) VALUES 
('Piloto'), 
('Engenheiro de Voo'), 
('Cientista de Carga');

INSERT INTO combustivel (tipo, marca) VALUES 
('Hidrogênio Líquido', 'SpaceFuel Corp'), 
('Querosene RP-1', 'RocketPropel');

INSERT INTO relatorio (descricao) VALUES 
('Missão de teste concluída com sucesso.'), 
('Coleta de dados sobre radiação cósmica finalizada.');

INSERT INTO empresa_parceira (nomeEmpresa, pais) VALUES 
('SpaceX', 'Estados Unidos'), 
('Blue Origin', 'Estados Unidos'),
('Arianespace', 'França');

INSERT INTO oxigenio (quantidadeAbastecida, estado) VALUES 
(500.0, 'Cheio'), 
(250.5, 'Metade');

INSERT INTO foguete (nome, combustivel_idCombustivel, localLancamento) VALUES 
('Falcon 9', 2, 'Cabo Canaveral'), 
('New Shepard', 1, 'Texas');

INSERT INTO astronauta (nomeAstro, pais, especialidade_idEspecialidade) VALUES 
('Marcos Pontes', 'Brasil', 1), 
('Neil Armstrong', 'Estados Unidos', 2),
('Buzz Aldrin', 'Estados Unidos', 3);

INSERT INTO missao (nomeMissao, duracaoDias, motivo, empresaParceira_idEmpresaParceira, astronauta_idAstronauta, foguete_idFoguete, foguete_combustivel_idCombustivel, relatorio_idRelatorio) VALUES 
('Missão Alfa', 10, 'Instalação de novos módulos', 1, 1, 1, 2, 1),
('Missão Beta', 15, 'Pesquisa de microgravidade', 2, 2, 2, 1, 2);

INSERT INTO estacao (nome, quantidadeModulos, estaAtiva, missao_idMissao, missao_empresaParceira_idEmpresaParceira, missao_astronauta_idAstronauta, missao_foguete_idFoguete, missao_foguete_combustivel_idCombustivel, temperatura, oxigenio_idOxigenio) VALUES 
('Estação Espacial Internacional', '15', 1, 1, 1, 1, 1, 2, 22.5, 1),
('Estação Tiangong', '3', 1, 2, 2, 2, 2, 1, 21.0, 2);

INSERT INTO login (nome, senha) VALUES 
('admin', '$2y$10$WqU2j01G.m/mC2mR2744/e.z97oU.0F.8h0d3r0n201a0b0c0d0e0');
