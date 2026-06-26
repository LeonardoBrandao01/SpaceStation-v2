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

// Helper to handle HTTP responses
async function handleResponse(res: Response) {
  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    const msg = errData?.message || `Erro na comunicação espacial (Status: ${res.status})`;
    const formattedMsg = Array.isArray(msg) ? msg.join('; ') : msg;
    throw new Error(formattedMsg);
  }
  if (res.status === 204) {
    return;
  }
  return res.json();
}

// Helper to inject auth headers to API calls
async function fetchWithAuth(url: string, init?: RequestInit): Promise<Response> {
  const saved = localStorage.getItem('auth_user');
  const headers = new Headers(init?.headers || {});
  
  if (saved) {
    try {
      const session = JSON.parse(saved);
      if (session.token) {
        headers.set('Authorization', `Bearer ${session.token}`);
      }
    } catch (e) {
      // ignore
    }
  }

  return fetch(url, {
    ...init,
    headers,
  });
}

// Database client object wrapping fetch API calls to the NestJS backend
export const mockDb = {
  especialidades: {
    getAll: async (): Promise<Especialidade[]> => {
      const res = await fetchWithAuth('/api/especialidades');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Especialidade | undefined> => {
      const res = await fetchWithAuth(`/api/especialidades/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Especialidade, 'idEspecialidade'>): Promise<Especialidade> => {
      const res = await fetchWithAuth('/api/especialidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Especialidade, 'idEspecialidade'>): Promise<Especialidade> => {
      const res = await fetchWithAuth(`/api/especialidades/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/especialidades/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  combustiveis: {
    getAll: async (): Promise<Combustivel[]> => {
      const res = await fetchWithAuth('/api/combustiveis');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Combustivel | undefined> => {
      const res = await fetchWithAuth(`/api/combustiveis/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Combustivel, 'idCombustivel'>): Promise<Combustivel> => {
      const res = await fetchWithAuth('/api/combustiveis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Combustivel, 'idCombustivel'>): Promise<Combustivel> => {
      const res = await fetchWithAuth(`/api/combustiveis/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/combustiveis/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  relatorios: {
    getAll: async (): Promise<Relatorio[]> => {
      const res = await fetchWithAuth('/api/relatorios');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Relatorio | undefined> => {
      const res = await fetchWithAuth(`/api/relatorios/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Relatorio, 'idRelatorio'>): Promise<Relatorio> => {
      const res = await fetchWithAuth('/api/relatorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Relatorio, 'idRelatorio'>): Promise<Relatorio> => {
      const res = await fetchWithAuth(`/api/relatorios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/relatorios/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  empresas: {
    getAll: async (): Promise<EmpresaParceira[]> => {
      const res = await fetchWithAuth('/api/empresas');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<EmpresaParceira | undefined> => {
      const res = await fetchWithAuth(`/api/empresas/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<EmpresaParceira, 'idEmpresaParceira'>): Promise<EmpresaParceira> => {
      const res = await fetchWithAuth('/api/empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<EmpresaParceira, 'idEmpresaParceira'>): Promise<EmpresaParceira> => {
      const res = await fetchWithAuth(`/api/empresas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/empresas/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  foguetes: {
    getAll: async (): Promise<Foguete[]> => {
      const res = await fetchWithAuth('/api/foguetes');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Foguete | undefined> => {
      const res = await fetchWithAuth(`/api/foguetes/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Foguete, 'idFoguete'>): Promise<Foguete> => {
      const res = await fetchWithAuth('/api/foguetes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Foguete, 'idFoguete'>): Promise<Foguete> => {
      const res = await fetchWithAuth(`/api/foguetes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/foguetes/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  astronautas: {
    getAll: async (): Promise<Astronauta[]> => {
      const res = await fetchWithAuth('/api/astronautas');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Astronauta | undefined> => {
      const res = await fetchWithAuth(`/api/astronautas/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Astronauta, 'idAstronauta'>): Promise<Astronauta> => {
      const res = await fetchWithAuth('/api/astronautas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Astronauta, 'idAstronauta'>): Promise<Astronauta> => {
      const res = await fetchWithAuth(`/api/astronautas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/astronautas/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  missoes: {
    getAll: async (): Promise<Missao[]> => {
      const res = await fetchWithAuth('/api/missoes');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Missao | undefined> => {
      const res = await fetchWithAuth(`/api/missoes/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Missao, 'idMissao'>): Promise<Missao> => {
      const res = await fetchWithAuth('/api/missoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Missao, 'idMissao'>): Promise<Missao> => {
      const res = await fetchWithAuth(`/api/missoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/missoes/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  oxigenios: {
    getAll: async (): Promise<Oxigenio[]> => {
      const res = await fetchWithAuth('/api/oxigenios');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Oxigenio | undefined> => {
      const res = await fetchWithAuth(`/api/oxigenios/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Oxigenio, 'idOxigenio'>): Promise<Oxigenio> => {
      const res = await fetchWithAuth('/api/oxigenios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Oxigenio, 'idOxigenio'>): Promise<Oxigenio> => {
      const res = await fetchWithAuth(`/api/oxigenios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/oxigenios/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  },

  estacoes: {
    getAll: async (): Promise<Estacao[]> => {
      const res = await fetchWithAuth('/api/estacoes');
      return handleResponse(res);
    },
    getById: async (id: number): Promise<Estacao | undefined> => {
      const res = await fetchWithAuth(`/api/estacoes/${id}`);
      return handleResponse(res);
    },
    create: async (item: Omit<Estacao, 'idEstacao'>): Promise<Estacao> => {
      const res = await fetchWithAuth('/api/estacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    update: async (id: number, item: Omit<Estacao, 'idEstacao'>): Promise<Estacao> => {
      const res = await fetchWithAuth(`/api/estacoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return handleResponse(res);
    },
    delete: async (id: number): Promise<void> => {
      const res = await fetchWithAuth(`/api/estacoes/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(res);
    }
  }
};
