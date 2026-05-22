// src/services/mockDb.ts

export interface Especialidade {
  idEspecialidade: number;
  nome: string;
}

export interface Combustivel {
  idCombustivel: number;
  tipo: string;
  marca: string;
}

export interface Relatorio {
  idRelatorio: number;
  descricao: string;
}

export interface EmpresaParceira {
  idEmpresaParceira: number;
  nomeEmpresa: string;
  pais: string;
}

export interface Foguete {
  idFoguete: number;
  nome: string;
  combustivel_idCombustivel: number;
  localLancamento: string;
}

export interface Astronauta {
  idAstronauta: number;
  nomeAstro: string;
  pais: string;
  especialidade_idEspecialidade: number;
}

export interface Missao {
  idMissao: number;
  nomeMissao: string;
  duracaoDias: number;
  motivo: string;
  empresaParceira_idEmpresaParceira: number;
  astronauta_idAstronauta: number;
  foguete_idFoguete: number;
  foguete_combustivel_idCombustivel: number;
  relatorio_idRelatorio: number;
}

export interface Oxigenio {
  idOxigenio: number;
  quantidadeAbastecida: number;
  estado: string;
}

export interface Estacao {
  idEstacao: number;
  nome: string;
  quantidadeModulos: string;
  estaAtiva: boolean;
  missao_idMissao: number;
  missao_empresaParceira_idEmpresaParceira: number;
  missao_astronauta_idAstronauta: number;
  missao_foguete_idFoguete: number;
  missao_foguete_combustivel_idCombustivel: number;
  temperatura: number;
  oxigenio_idOxigenio: number;
}

// Initial seed data
const SEED_ESPECIALIDADES: Especialidade[] = [
  { idEspecialidade: 1, nome: "Engenharia de Voo" },
  { idEspecialidade: 2, nome: "Astrofísica" },
  { idEspecialidade: 3, nome: "Biologia Espacial" },
  { idEspecialidade: 4, nome: "Piloto Orbital" }
];

const SEED_COMBUSTIVEIS: Combustivel[] = [
  { idCombustivel: 1, tipo: "Oxigênio Líquido / Querosene (RP-1)", marca: "SpaceX SpaceGrade" },
  { idCombustivel: 2, tipo: "Hidrogênio Líquido / Oxigênio Líquido", marca: "NASA SLS Aero" },
  { idCombustivel: 3, tipo: "Metano Líquido / LOX", marca: "Blue Origin Raptor" }
];

const SEED_RELATORIOS: Relatorio[] = [
  { idRelatorio: 1, descricao: "Pressurização do módulo principal concluída com sucesso. Sem vazamentos detectados." },
  { idRelatorio: 2, descricao: "Experimento de microgravidade com células vegetais demonstrou taxa de crescimento acelerada." },
  { idRelatorio: 3, descricao: "Ajuste orbital menor concluído com sucesso às 04:12 UTC." }
];

const SEED_EMPRESAS: EmpresaParceira[] = [
  { idEmpresaParceira: 1, nomeEmpresa: "SpaceX", pais: "Estados Unidos" },
  { idEmpresaParceira: 2, nomeEmpresa: "NASA", pais: "Estados Unidos" },
  { idEmpresaParceira: 3, nomeEmpresa: "ESA (Agência Espacial Europeia)", pais: "Europa (Multi)" },
  { idEmpresaParceira: 4, nomeEmpresa: "JAXA", pais: "Japão" }
];

const SEED_FOGUETES: Foguete[] = [
  { idFoguete: 1, nome: "Falcon 9", combustivel_idCombustivel: 1, localLancamento: "Cabo Canaveral - LC-39A" },
  { idFoguete: 2, nome: "Space Launch System (SLS)", combustivel_idCombustivel: 2, localLancamento: "Kennedy Space Center" },
  { idFoguete: 3, nome: "Starship", combustivel_idCombustivel: 3, localLancamento: "Starbase - Boca Chica" }
];

const SEED_ASTRONAUTAS: Astronauta[] = [
  { idAstronauta: 1, nomeAstro: "Marcos Pontes", pais: "Brasil", especialidade_idEspecialidade: 1 },
  { idAstronauta: 2, nomeAstro: "Peggy Whitson", pais: "Estados Unidos", especialidade_idEspecialidade: 3 },
  { idAstronauta: 3, nomeAstro: "Chris Hadfield", pais: "Canadá", especialidade_idEspecialidade: 4 }
];

const SEED_MISSOES: Missao[] = [
  {
    idMissao: 1,
    nomeMissao: "Expedição 70",
    duracaoDias: 45,
    motivo: "Instalação do novo laboratório de biologia molecular em gravidade zero e manutenção dos painéis solares principais.",
    empresaParceira_idEmpresaParceira: 2,
    astronauta_idAstronauta: 2,
    foguete_idFoguete: 1,
    foguete_combustivel_idCombustivel: 1,
    relatorio_idRelatorio: 1
  },
  {
    idMissao: 2,
    nomeMissao: "Artemis III",
    duracaoDias: 14,
    motivo: "Pouso tripulado na região do polo sul lunar para coleta de amostras de gelo de água e geologia.",
    empresaParceira_idEmpresaParceira: 1,
    astronauta_idAstronauta: 3,
    foguete_idFoguete: 3,
    foguete_combustivel_idCombustivel: 3,
    relatorio_idRelatorio: 3
  }
];

const SEED_OXIGENIO: Oxigenio[] = [
  { idOxigenio: 1, quantidadeAbastecida: 1500, estado: "Excelente" },
  { idOxigenio: 2, quantidadeAbastecida: 450, estado: "Alerta Crítico" },
  { idOxigenio: 3, quantidadeAbastecida: 980, estado: "Estável" }
];

const SEED_ESTACOES: Estacao[] = [
  {
    idEstacao: 1,
    nome: "Gateway Alpha",
    quantidadeModulos: "8",
    estaAtiva: true,
    missao_idMissao: 2,
    missao_empresaParceira_idEmpresaParceira: 1,
    missao_astronauta_idAstronauta: 3,
    missao_foguete_idFoguete: 3,
    missao_foguete_combustivel_idCombustivel: 3,
    temperatura: 21.5,
    oxigenio_idOxigenio: 1
  },
  {
    idEstacao: 2,
    nome: "Vanguard Station",
    quantidadeModulos: "4",
    estaAtiva: false,
    missao_idMissao: 1,
    missao_empresaParceira_idEmpresaParceira: 2,
    missao_astronauta_idAstronauta: 2,
    missao_foguete_idFoguete: 1,
    missao_foguete_combustivel_idCombustivel: 1,
    temperatura: 17.8,
    oxigenio_idOxigenio: 2
  }
];

type TableName = 
  | 'especialidade'
  | 'combustivel'
  | 'relatorio'
  | 'empresa_parceira'
  | 'foguete'
  | 'astronauta'
  | 'missao'
  | 'oxigenio'
  | 'estacao';

// Helper to load table from localStorage or fall back to seed
export function getTableData<T>(table: TableName, seeds: T[]): T[] {
  const data = localStorage.getItem(`db_${table}`);
  if (!data) {
    localStorage.setItem(`db_${table}`, JSON.stringify(seeds));
    return seeds;
  }
  return JSON.parse(data);
}

export function saveTableData<T>(table: TableName, data: T[]): void {
  localStorage.setItem(`db_${table}`, JSON.stringify(data));
}

// Database client object
export const mockDb = {
  // Read all
  especialidades: {
    getAll: () => getTableData<Especialidade>('especialidade', SEED_ESPECIALIDADES),
    getById: (id: number) => mockDb.especialidades.getAll().find(x => x.idEspecialidade === id),
    create: (item: Omit<Especialidade, 'idEspecialidade'>) => {
      const data = mockDb.especialidades.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idEspecialidade), 0) + 1;
      const newItem = { ...item, idEspecialidade: nextId };
      saveTableData('especialidade', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Especialidade, 'idEspecialidade'>) => {
      const data = mockDb.especialidades.getAll();
      const updated = data.map(x => x.idEspecialidade === id ? { ...x, ...item } : x);
      saveTableData('especialidade', updated);
    },
    delete: (id: number) => {
      // Check constraints (astronauta has especialidade)
      const astronauts = mockDb.astronautas.getAll();
      if (astronauts.some(a => a.especialidade_idEspecialidade === id)) {
        throw new Error("Não é possível deletar esta especialidade pois existem astronautas vinculados a ela.");
      }
      const data = mockDb.especialidades.getAll();
      saveTableData('especialidade', data.filter(x => x.idEspecialidade !== id));
    }
  },

  combustiveis: {
    getAll: () => getTableData<Combustivel>('combustivel', SEED_COMBUSTIVEIS),
    getById: (id: number) => mockDb.combustiveis.getAll().find(x => x.idCombustivel === id),
    create: (item: Omit<Combustivel, 'idCombustivel'>) => {
      const data = mockDb.combustiveis.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idCombustivel), 0) + 1;
      const newItem = { ...item, idCombustivel: nextId };
      saveTableData('combustivel', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Combustivel, 'idCombustivel'>) => {
      const data = mockDb.combustiveis.getAll();
      const updated = data.map(x => x.idCombustivel === id ? { ...x, ...item } : x);
      saveTableData('combustivel', updated);
    },
    delete: (id: number) => {
      const foguetes = mockDb.foguetes.getAll();
      const missoes = mockDb.missoes.getAll();
      if (foguetes.some(f => f.combustivel_idCombustivel === id) || missoes.some(m => m.foguete_combustivel_idCombustivel === id)) {
        throw new Error("Não é possível deletar este combustível pois ele está vinculado a um foguete ou missão.");
      }
      const data = mockDb.combustiveis.getAll();
      saveTableData('combustivel', data.filter(x => x.idCombustivel !== id));
    }
  },

  relatorios: {
    getAll: () => getTableData<Relatorio>('relatorio', SEED_RELATORIOS),
    getById: (id: number) => mockDb.relatorios.getAll().find(x => x.idRelatorio === id),
    create: (item: Omit<Relatorio, 'idRelatorio'>) => {
      const data = mockDb.relatorios.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idRelatorio), 0) + 1;
      const newItem = { ...item, idRelatorio: nextId };
      saveTableData('relatorio', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Relatorio, 'idRelatorio'>) => {
      const data = mockDb.relatorios.getAll();
      const updated = data.map(x => x.idRelatorio === id ? { ...x, ...item } : x);
      saveTableData('relatorio', updated);
    },
    delete: (id: number) => {
      const missoes = mockDb.missoes.getAll();
      if (missoes.some(m => m.relatorio_idRelatorio === id)) {
        throw new Error("Não é possível deletar este relatório pois ele está vinculado a uma missão.");
      }
      const data = mockDb.relatorios.getAll();
      saveTableData('relatorio', data.filter(x => x.idRelatorio !== id));
    }
  },

  empresas: {
    getAll: () => getTableData<EmpresaParceira>('empresa_parceira', SEED_EMPRESAS),
    getById: (id: number) => mockDb.empresas.getAll().find(x => x.idEmpresaParceira === id),
    create: (item: Omit<EmpresaParceira, 'idEmpresaParceira'>) => {
      const data = mockDb.empresas.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idEmpresaParceira), 0) + 1;
      const newItem = { ...item, idEmpresaParceira: nextId };
      saveTableData('empresa_parceira', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<EmpresaParceira, 'idEmpresaParceira'>) => {
      const data = mockDb.empresas.getAll();
      const updated = data.map(x => x.idEmpresaParceira === id ? { ...x, ...item } : x);
      saveTableData('empresa_parceira', updated);
    },
    delete: (id: number) => {
      const missoes = mockDb.missoes.getAll();
      if (missoes.some(m => m.empresaParceira_idEmpresaParceira === id)) {
        throw new Error("Não é possível deletar esta empresa parceira pois ela está vinculada a uma missão.");
      }
      const data = mockDb.empresas.getAll();
      saveTableData('empresa_parceira', data.filter(x => x.idEmpresaParceira !== id));
    }
  },

  foguetes: {
    getAll: () => getTableData<Foguete>('foguete', SEED_FOGUETES),
    getById: (id: number) => mockDb.foguetes.getAll().find(x => x.idFoguete === id),
    create: (item: Omit<Foguete, 'idFoguete'>) => {
      const data = mockDb.foguetes.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idFoguete), 0) + 1;
      const newItem = { ...item, idFoguete: nextId };
      saveTableData('foguete', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Foguete, 'idFoguete'>) => {
      const data = mockDb.foguetes.getAll();
      const updated = data.map(x => x.idFoguete === id ? { ...x, ...item } : x);
      saveTableData('foguete', updated);
    },
    delete: (id: number) => {
      const missoes = mockDb.missoes.getAll();
      if (missoes.some(m => m.foguete_idFoguete === id)) {
        throw new Error("Não é possível deletar este foguete pois ele está vinculado a uma missão.");
      }
      const data = mockDb.foguetes.getAll();
      saveTableData('foguete', data.filter(x => x.idFoguete !== id));
    }
  },

  astronautas: {
    getAll: () => getTableData<Astronauta>('astronauta', SEED_ASTRONAUTAS),
    getById: (id: number) => mockDb.astronautas.getAll().find(x => x.idAstronauta === id),
    create: (item: Omit<Astronauta, 'idAstronauta'>) => {
      const data = mockDb.astronautas.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idAstronauta), 0) + 1;
      const newItem = { ...item, idAstronauta: nextId };
      saveTableData('astronauta', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Astronauta, 'idAstronauta'>) => {
      const data = mockDb.astronautas.getAll();
      const updated = data.map(x => x.idAstronauta === id ? { ...x, ...item } : x);
      saveTableData('astronauta', updated);
    },
    delete: (id: number) => {
      const missoes = mockDb.missoes.getAll();
      if (missoes.some(m => m.astronauta_idAstronauta === id)) {
        throw new Error("Não é possível deletar este astronauta pois ele está vinculado a uma missão.");
      }
      const data = mockDb.astronautas.getAll();
      saveTableData('astronauta', data.filter(x => x.idAstronauta !== id));
    }
  },

  missoes: {
    getAll: () => getTableData<Missao>('missao', SEED_MISSOES),
    getById: (id: number) => mockDb.missoes.getAll().find(x => x.idMissao === id),
    create: (item: Omit<Missao, 'idMissao'>) => {
      const data = mockDb.missoes.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idMissao), 0) + 1;
      const newItem = { ...item, idMissao: nextId };
      saveTableData('missao', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Missao, 'idMissao'>) => {
      const data = mockDb.missoes.getAll();
      const updated = data.map(x => x.idMissao === id ? { ...x, ...item } : x);
      saveTableData('missao', updated);
    },
    delete: (id: number) => {
      const estacoes = mockDb.estacoes.getAll();
      if (estacoes.some(e => e.missao_idMissao === id)) {
        throw new Error("Não é possível deletar esta missão pois ela está associada a uma estação espacial.");
      }
      const data = mockDb.missoes.getAll();
      saveTableData('missao', data.filter(x => x.idMissao !== id));
    }
  },

  oxigenios: {
    getAll: () => getTableData<Oxigenio>('oxigenio', SEED_OXIGENIO),
    getById: (id: number) => mockDb.oxigenios.getAll().find(x => x.idOxigenio === id),
    create: (item: Omit<Oxigenio, 'idOxigenio'>) => {
      const data = mockDb.oxigenios.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idOxigenio), 0) + 1;
      const newItem = { ...item, idOxigenio: nextId };
      saveTableData('oxigenio', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Oxigenio, 'idOxigenio'>) => {
      const data = mockDb.oxigenios.getAll();
      const updated = data.map(x => x.idOxigenio === id ? { ...x, ...item } : x);
      saveTableData('oxigenio', updated);
    },
    delete: (id: number) => {
      const estacoes = mockDb.estacoes.getAll();
      if (estacoes.some(e => e.oxigenio_idOxigenio === id)) {
        throw new Error("Não é possível deletar esta carga de oxigênio pois ela está em uso por uma estação.");
      }
      const data = mockDb.oxigenios.getAll();
      saveTableData('oxigenio', data.filter(x => x.idOxigenio !== id));
    }
  },

  estacoes: {
    getAll: () => getTableData<Estacao>('estacao', SEED_ESTACOES),
    getById: (id: number) => mockDb.estacoes.getAll().find(x => x.idEstacao === id),
    create: (item: Omit<Estacao, 'idEstacao'>) => {
      const data = mockDb.estacoes.getAll();
      const nextId = data.reduce((max, x) => Math.max(max, x.idEstacao), 0) + 1;
      const newItem = { ...item, idEstacao: nextId };
      saveTableData('estacao', [...data, newItem]);
      return newItem;
    },
    update: (id: number, item: Omit<Estacao, 'idEstacao'>) => {
      const data = mockDb.estacoes.getAll();
      const updated = data.map(x => x.idEstacao === id ? { ...x, ...item } : x);
      saveTableData('estacao', updated);
    },
    delete: (id: number) => {
      const data = mockDb.estacoes.getAll();
      saveTableData('estacao', data.filter(x => x.idEstacao !== id));
    }
  }
};
