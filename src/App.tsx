// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

// CRUD Pages
import { EspecialidadeList } from './pages/especialidade/EspecialidadeList';
import { EspecialidadeForm } from './pages/especialidade/EspecialidadeForm';
import { CombustivelList } from './pages/combustivel/CombustivelList';
import { CombustivelForm } from './pages/combustivel/CombustivelForm';
import { RelatorioList } from './pages/relatorio/RelatorioList';
import { RelatorioForm } from './pages/relatorio/RelatorioForm';
import { EmpresaList } from './pages/empresa-parceira/EmpresaList';
import { EmpresaForm } from './pages/empresa-parceira/EmpresaForm';
import { FogueteList } from './pages/foguete/FogueteList';
import { FogueteForm } from './pages/foguete/FogueteForm';
import { AstronautaList } from './pages/astronauta/AstronautaList';
import { AstronautaForm } from './pages/astronauta/AstronautaForm';
import { MissaoList } from './pages/missao/MissaoList';
import { MissaoForm } from './pages/missao/MissaoForm';
import { OxigenioList } from './pages/oxigenio/OxigenioList';
import { OxigenioForm } from './pages/oxigenio/OxigenioForm';
import { EstacaoList } from './pages/estacao/EstacaoList';
import { EstacaoForm } from './pages/estacao/EstacaoForm';

const NavigationLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="nav-layout">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        INICIALIZANDO SUBSISTEMAS ORBITAIS...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <NavigationLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Especialidade Routes */}
        <Route path="/especialidade" element={<EspecialidadeList />} />
        <Route path="/especialidade/novo" element={<EspecialidadeForm />} />
        <Route path="/especialidade/editar/:id" element={<EspecialidadeForm />} />

        {/* Combustivel Routes */}
        <Route path="/combustivel" element={<CombustivelList />} />
        <Route path="/combustivel/novo" element={<CombustivelForm />} />
        <Route path="/combustivel/editar/:id" element={<CombustivelForm />} />

        {/* Relatorio Routes */}
        <Route path="/relatorio" element={<RelatorioList />} />
        <Route path="/relatorio/novo" element={<RelatorioForm />} />
        <Route path="/relatorio/editar/:id" element={<RelatorioForm />} />

        {/* Empresa Parceira Routes */}
        <Route path="/empresa-parceira" element={<EmpresaList />} />
        <Route path="/empresa-parceira/novo" element={<EmpresaForm />} />
        <Route path="/empresa-parceira/editar/:id" element={<EmpresaForm />} />

        {/* Foguete Routes */}
        <Route path="/foguete" element={<FogueteList />} />
        <Route path="/foguete/novo" element={<FogueteForm />} />
        <Route path="/foguete/editar/:id" element={<FogueteForm />} />

        {/* Astronauta Routes (Protected internally by components too) */}
        <Route path="/astronauta" element={<AstronautaList />} />
        <Route path="/astronauta/novo" element={<AstronautaForm />} />
        <Route path="/astronauta/editar/:id" element={<AstronautaForm />} />

        {/* Missao Routes */}
        <Route path="/missao" element={<MissaoList />} />
        <Route path="/missao/novo" element={<MissaoForm />} />
        <Route path="/missao/editar/:id" element={<MissaoForm />} />

        {/* Oxigenio Routes */}
        <Route path="/oxigenio" element={<OxigenioList />} />
        <Route path="/oxigenio/novo" element={<OxigenioForm />} />
        <Route path="/oxigenio/editar/:id" element={<OxigenioForm />} />

        {/* Estacao Routes */}
        <Route path="/estacao" element={<EstacaoList />} />
        <Route path="/estacao/novo" element={<EstacaoForm />} />
        <Route path="/estacao/editar/:id" element={<EstacaoForm />} />

        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </NavigationLayout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
