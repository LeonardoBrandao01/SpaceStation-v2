// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  name: string;
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: UserSession | null;
  login: (username: string, password: string, requireAdmin: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, requireAdmin: boolean) => {
    // Mimic API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const u = username.trim().toLowerCase();
    const p = password;

    if (u === 'admin' && p === 'admin123') {
      const session: UserSession = {
        name: 'Administrador da Estação',
        username: 'admin',
        role: 'admin'
      };
      localStorage.setItem('auth_user', JSON.stringify(session));
      setUser(session);
    } else if (u === 'usuario' && p === 'user123') {
      if (requireAdmin) {
        throw new Error('Acesso negado: Perfil de Administrador exigido.');
      }
      const session: UserSession = {
        name: 'Operador de Voo',
        username: 'usuario',
        role: 'user'
      };
      localStorage.setItem('auth_user', JSON.stringify(session));
      setUser(session);
    } else {
      throw new Error('Credenciais espaciais incorretas.');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
