// src/pages/especialidade/EspecialidadeList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Especialidade } from '../../services/mockDb';
import { Plus, Edit, Trash2, Award, AlertTriangle } from 'lucide-react';

export const EspecialidadeList: React.FC = () => {
  const [items, setItems] = useState<Especialidade[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(mockDb.especialidades.getAll());
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente excluir esta especialidade espacial?")) return;
    
    try {
      mockDb.especialidades.delete(id);
      setSuccess("Especialidade removida do banco de dados.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar especialidade.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">ESPECIALIDADES</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Gerenciamento das áreas de capacitação da tripulação astronáutica.
          </p>
        </div>
        <Link to="/especialidade/novo" className="btn primary">
          <Plus size={16} /> Nova Especialidade
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
            Nenhuma especialidade cadastrada no sistema de telemetria.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Especialidade</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idEspecialidade}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>#{item.idEspecialidade}</td>
                    <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={16} style={{ color: 'var(--cyan)' }} />
                      {item.nome}
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/especialidade/editar/${item.idEspecialidade}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idEspecialidade)}
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
