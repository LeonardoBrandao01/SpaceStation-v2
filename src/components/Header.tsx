// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, Shield, User } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString().replace('GMT', 'UTC');
      setTimeStr(utcString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header glass-panel">
      <div className="header-title-section">
        <button 
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="header-status">
          <div className="status-dot"></div>
          <span>ESTAÇÃO OPERACIONAL</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-clock">
          {timeStr}
        </div>

        {user && (
          <div className="user-profile-badge">
            {user.role === 'admin' ? (
              <Shield size={14} style={{ color: 'var(--cyan)' }} />
            ) : (
              <User size={14} style={{ color: 'var(--orange)' }} />
            )}
            <span>{user.name}</span>
            <span className={`role-tag ${user.role}`}>
              {user.role}
            </span>
          </div>
        )}

        <button 
          className="logout-btn" 
          onClick={logout}
          title="Encerrar sessão de controle"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
