// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Orbit, Lock, User } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [requireAdmin, setRequireAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(username, password, requireAdmin);
    } catch (err: any) {
      setError(err.message || 'Erro de conexão orbital.');
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card glass-panel">
        <div className="login-header">
          <div className="login-icon-wrap">
            <Orbit size={32} className="animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h2>ESTAÇÃO ESPACIAL</h2>
          <div className="login-subtitle">Sistema de Controle Orbital</div>
        </div>

        {error && (
          <div className="alert danger">
            <ShieldAlert size={18} />
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={12} /> Usuário
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu identificador"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lock size={12} /> Chave de Acesso
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <input
              type="checkbox"
              id="admin-chk"
              checked={requireAdmin}
              onChange={(e) => setRequireAdmin(e.target.checked)}
              disabled={submitting}
              style={{
                width: '16px',
                height: '16px',
                accentColor: 'var(--cyan)',
                cursor: 'pointer'
              }}
            />
            <label 
              htmlFor="admin-chk" 
              style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-secondary)', 
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              Entrar como administrador
            </label>
          </div>

          <button 
            type="submit" 
            className="btn primary" 
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={submitting}
          >
            {submitting ? 'Verificando Vetor de Acesso...' : 'Autenticar Sistema'}
          </button>
        </form>

        <div className="login-demo-accounts">
          <p style={{ marginBottom: '0.25rem' }}>🔐 <strong>Credenciais de Demonstração:</strong></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <span>• Administrador: <code>admin</code> / <code>admin123</code> (Marcar checkbox)</span>
            <span>• Operador Comum: <code>usuario</code> / <code>user123</code></span>
          </div>
        </div>
      </div>
    </div>
  );
};
