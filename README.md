# Estação Espacial - Frontend React

Este subprojeto consiste na refatoração e recriação do frontend do sistema **Estação Espacial** utilizando **React**, **TypeScript**, **Vite** e **CSS customizado (Vanilla CSS)** com uma estética moderna, futurista e de alta fidelidade visual (com painéis de vidro - glassmorphism, brilhos neon e animações).

O sistema inclui o fluxo completo de CRUDs da estação original, controle de rotas por perfis de acesso simulados, relógio universal integrado e um banco de dados mockado persistente.

---

## 🛠️ Tecnologias Utilizadas

1. **React 18+ & Vite** — Para uma inicialização extremamente rápida e Hot Module Replacement (HMR).
2. **TypeScript** — Tipagem estática em todos os modelos para garantir robustez e evitar bugs de execução.
3. **React Router DOM v6** — Gerenciamento completo de rotas navegáveis da aplicação.
4. **Lucide React** — Ícones modernos e futuristas para compor o cockpit de controle espacial.
5. **CSS Clássico (Vanilla)** — Configurado com variáveis personalizadas de HSL, efeitos de glassmorphism (`backdrop-filter`), animações e grids responsivos.

---

## 🛰️ Recursos Principais da Central de Operações

- **Dashboard de Telemetria Dinâmico:** Monitor vital da estação que exibe o nível de oxigênio de suporte à vida em um indicador radial ativo, temperatura do reator, módulos ativos acoplados e feed com missões recentes.
- **Persistência de Dados em LocalStorage:** Um serviço centralizado (`mockDb.ts`) lê e persiste as alterações em tempo real no `localStorage` do navegador. É possível criar, listar, atualizar e remover registros de todas as 9 tabelas do banco de dados (especialidades, combustíveis, relatórios, empresas, foguetes, astronautas, missões, oxigênios e estações).
- **Controle de Perfil de Acesso (Simulado):** 
  - O perfil **Administrador** possui acesso irrestrito.
  - O perfil **User (Operador comum)** possui restrições no menu lateral e na navegação de URL, sendo impedido de visualizar ou cadastrar tripulantes na página de **Astronautas** (exibindo uma tela holográfica de bloqueio).
- **Relógio de Bordo UTC:** Cabeçalho com indicador dinâmico de hora coordenada universal (UTC) e sinalizador piscante de telemetria ativa.

---

## 🔐 Credenciais de Acesso (Cockpit Login)

Para autenticar no painel, utilize um dos perfis pré-configurados:

| Usuário | Senha | Perfil | Nível de Acesso | Observação |
| :--- | :--- | :--- | :--- | :--- |
| `admin` | `admin123` | **Administrador** | Total (Geral e Astronautas) | Marcar o checkbox "Entrar como administrador" |
| `usuario` | `user123` | **User** | Operações Gerais (Astronautas Bloqueado) | Não marcar o checkbox |

---

## 🚀 Como Rodar o Projeto (Desenvolvimento)

Siga os passos abaixo para iniciar o backend e o frontend localmente:

### 1. Inicie o backend NestJS
```bash
cd app
npm install
npm run start:dev
```

O backend será executado em:
`http://localhost:3000`

### 2. Em outra aba/terminal, inicie o frontend React
```bash
cd ..
npm install
npm run dev
```

O frontend será executado em:
`http://localhost:5173`

### 3. Acesse no navegador
Abra a URL exibida no console do frontend, geralmente:
👉 [http://localhost:5173](http://localhost:5173)

---

## 📁 Estrutura de Pastas do Frontend

```
space-station-frontend/
├── src/
│   ├── components/       # Componentes comuns (Sidebar, Header)
│   ├── context/          # Provedores de estado global (AuthContext)
│   ├── pages/            # Telas da aplicação
│   │   ├── astronauta/   # CRUD Astronautas (Admin Only)
│   │   ├── combustivel/  # CRUD Combustíveis
│   │   ├── empresa-par/  # CRUD Empresas Parceiras
│   │   ├── especialidade/# CRUD Especialidades de Tripulantes
│   │   ├── estacao/      # CRUD Estações Espaciais
│   │   ├── foguete/      # CRUD Veículos de Lançamento (Foguetes)
│   │   ├── missao/       # CRUD Missões Espaciais
│   │   ├── oxigenio/     # CRUD Suprimentos de O₂
│   │   ├── relatorio/    # CRUD Diário de Bordo & Relatórios
│   │   ├── Dashboard.tsx # Tela Principal de Telemetria
│   │   └── Login.tsx     # Cockpit holográfico de login
│   ├── services/         # Camada de Dados (mockDb.ts para simulação da API)
│   ├── styles/           # Folhas de estilo da aplicação (index.css)
│   ├── App.tsx           # Configuração de Rotas e Provedores
│   └── main.tsx          # Ponto de entrada do React
```
