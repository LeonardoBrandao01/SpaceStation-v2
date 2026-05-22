// src/pages/astronauta/AstronautaList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Astronauta } from '../../services/mockDb';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Users, AlertTriangle, ShieldAlert, Award } from 'lucide-react';

export const AstronautaList: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [items, setItems] = useState<Astronauta[]>([]);
  const [specsMap, setSpecsMap] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = () => {
    setItems(mockDb.astronautas.getAll());

    const specs = mockDb.especialidades.getAll();
    const map: Record<number, string> = {};
    specs.forEach(s => {
      map[s.idEspecialidade] = s.nome;
    });
    setSpecsMap(map);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente descadastrar este astronauta da tripulação de voo?")) return;
    
    try {
      mockDb.astronautas.delete(id);
      setSuccess("Astronauta removido da tripulação ativa.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao descadastrar astronauta.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  // If not admin, show restricted screen (satisfying the project's security constraints!)
  if (!isAdmin) {
    return (
      <div className="glass-panel restricted-page-container">
        <ShieldAlert size={64} className="restricted-icon" />
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--orange)' }}>ACESSO RESTRITO</h2>
        <p style={{ maxWidth: '500px', color: 'var(--text-secondary)' }}>
          Este módulo contém dados confidenciais e registros vitais da tripulação ativa. 
          Apenas oficiais com credenciais de <strong>Administrador (admin)</strong> podem acessar.
        </p>
        <Link to="/" className="btn primary" style={{ marginTop: '1rem' }}>
          Voltar ao Painel Principal
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">CORPO DE ASTRONAUTAS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Gerenciamento de tripulantes ativos, nacionalidades e qualificações técnicas espaciais.
          </p>
        </div>
        <Link to="/astronauta/novo" className="btn primary">
          <Plus size={16} /> Cadastrar Astronauta
        </Link>
      </div>

      {success && (
        <div className="alert success">
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="alert danger">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="glass-card">
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            Nenhum astronauta ativo cadastrado nos registros da estação.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Nome do Tripulante</th>
                  <th>Nacionalidade</th>
                  <th>Especialidade Especializada</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idAstronauta}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>ASTRO #{item.idAstronauta}</td>
                    <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={16} style={{ color: 'var(--cyan)' }} />
                      {item.nomeAstro}
                    </td>
                    <td>{item.pais}</td>
                    <td>
                      <span className="badge cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Award size={10} />
                        {specsMap[item.especialidade_idEspecialidade] || `Desconhecida (ID: ${item.especialidade_idEspecialidade})`}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/astronauta/editar/${item.idAstronauta}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idAstronauta)}
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
