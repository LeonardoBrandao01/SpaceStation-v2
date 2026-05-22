// src/pages/combustivel/CombustivelList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Combustivel } from '../../services/mockDb';
import { Plus, Edit, Trash2, Flame, AlertTriangle } from 'lucide-react';

export const CombustivelList: React.FC = () => {
  const [items, setItems] = useState<Combustivel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(mockDb.combustiveis.getAll());
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente remover este combustível químico do inventário?")) return;
    
    try {
      mockDb.combustiveis.delete(id);
      setSuccess("Combustível removido com sucesso.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao excluir combustível.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">COMBUSTÍVEIS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Registro de compostos químicos e propelentes para propulsão de foguetes.
          </p>
        </div>
        <Link to="/combustivel/novo" className="btn primary">
          <Plus size={16} /> Novo Combustível
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
            Nenhum propelente cadastrado nos silos da estação.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Tipo de Combustível</th>
                  <th>Marca / Fabricante</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idCombustivel}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>#{item.idCombustivel}</td>
                    <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Flame size={16} style={{ color: 'var(--orange)' }} />
                      {item.tipo}
                    </td>
                    <td>{item.marca}</td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/combustivel/editar/${item.idCombustivel}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idCombustivel)}
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
