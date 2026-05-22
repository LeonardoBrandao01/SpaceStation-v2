// src/pages/empresa-parceira/EmpresaList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type EmpresaParceira } from '../../services/mockDb';
import { Plus, Edit, Trash2, Building2, AlertTriangle } from 'lucide-react';

export const EmpresaList: React.FC = () => {
  const [items, setItems] = useState<EmpresaParceira[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(mockDb.empresas.getAll());
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente descadastrar esta agência/empresa parceira?")) return;
    
    try {
      mockDb.empresas.delete(id);
      setSuccess("Empresa parceira desvinculada com sucesso.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar empresa.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">EMPRESAS PARCEIRAS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Agências espaciais nacionais e corporações privadas associadas às operações da estação.
          </p>
        </div>
        <Link to="/empresa-parceira/novo" className="btn primary">
          <Plus size={16} /> Nova Parceira
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
            Nenhuma corporação parceira listada nos arquivos principais.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Nome da Empresa</th>
                  <th>País de Origem</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idEmpresaParceira}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>#{item.idEmpresaParceira}</td>
                    <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Building2 size={16} style={{ color: 'var(--cyan)' }} />
                      {item.nomeEmpresa}
                    </td>
                    <td>{item.pais}</td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/empresa-parceira/editar/${item.idEmpresaParceira}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idEmpresaParceira)}
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
