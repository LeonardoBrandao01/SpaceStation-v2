// src/pages/oxigenio/OxigenioList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Oxigenio } from '../../services/mockDb';
import { Plus, Edit, Trash2, Wind, AlertTriangle } from 'lucide-react';

export const OxigenioList: React.FC = () => {
  const [items, setItems] = useState<Oxigenio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(mockDb.oxigenios.getAll());
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente remover esta carga de oxigênio do sistema?")) return;
    
    try {
      mockDb.oxigenios.delete(id);
      setSuccess("Carga de oxigênio excluída com sucesso.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar oxigênio.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  const getStatusBadgeClass = (state: string) => {
    const s = state.toLowerCase();
    if (s.includes('excelente') || s.includes('estável') || s.includes('ok')) return 'success';
    if (s.includes('alerta') || s.includes('médio')) return 'warning';
    return 'danger';
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">SUPRIMENTOS DE OXIGÊNIO (O₂)</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Controle de cilindros de suporte vital e cargas gasosas para a atmosfera respirável da estação.
          </p>
        </div>
        <Link to="/oxigenio/novo" className="btn primary">
          <Plus size={16} /> Novo Abastecimento
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
            Nenhum lote de oxigênio cadastrado no inventário.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Lote</th>
                  <th>Quantidade Abastecida (Litros)</th>
                  <th>Estado do Suprimento</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idOxigenio}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>LOTE #{item.idOxigenio}</td>
                    <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Wind size={16} style={{ color: 'var(--cyan)' }} />
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{item.quantidadeAbastecida} Litros</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(item.estado)}`}>
                        {item.estado}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/oxigenio/editar/${item.idOxigenio}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idOxigenio)}
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
