// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Compass, 
  Rocket, 
  Users, 
  Flame, 
  Building2, 
  Award, 
  Wind, 
  FileText, 
  Radio, 
  Lock,
  Orbit
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
    { path: '/missao', label: 'Missões', icon: Compass, adminOnly: false },
    { path: '/foguete', label: 'Foguetes', icon: Rocket, adminOnly: false },
    { path: '/astronauta', label: 'Astronautas', icon: Users, adminOnly: true },
    { path: '/combustivel', label: 'Combustíveis', icon: Flame, adminOnly: false },
    { path: '/empresa-parceira', label: 'Empresas Parceiras', icon: Building2, adminOnly: false },
    { path: '/especialidade', label: 'Especialidades', icon: Award, adminOnly: false },
    { path: '/oxigenio', label: 'Oxigênio', icon: Wind, adminOnly: false },
    { path: '/relatorio', label: 'Relatórios', icon: FileText, adminOnly: false },
    { path: '/estacao', label: 'Estações', icon: Radio, adminOnly: false },
  ];

  return (
    <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <Orbit size={28} className="text-cyan animate-pulse" style={{ color: 'var(--cyan)' }} />
        <span className="sidebar-logo-text">Space Station</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isRestricted = item.adminOnly && !isAdmin;
          const Icon = item.icon;

          if (isRestricted) {
            return (
              <div 
                key={item.path} 
                className="sidebar-item restricted"
                title="Acesso reservado para Administradores"
              >
                <Icon size={18} />
                <span>{item.label}</span>
                <Lock size={14} style={{ marginLeft: 'auto', color: 'var(--orange)' }} />
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)} // Close sidebar on mobile select
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          LATENCY: 14ms
        </p>
      </div>
    </aside>
  );
};
