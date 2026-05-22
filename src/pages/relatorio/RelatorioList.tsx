// src/pages/relatorio/RelatorioList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Relatorio } from '../../services/mockDb';
import { Plus, Edit, Trash2, FileText, AlertTriangle } from 'lucide-react';

export const RelatorioList: React.FC = () => {
  const [items, setItems] = useState<Relatorio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(mockDb.relatorios.getAll());
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente arquivar permanentemente este relatório espacial?")) return;
    
    try {
      mockDb.relatorios.delete(id);
      setSuccess("Relatório excluído com sucesso.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar relatório.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">DIÁRIO DE BORDO & RELATÓRIOS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Registros de atividades, telemetria orbital e ocorrências científicas da tripulação.
          </p>
        </div>
        <Link to="/relatorio/novo" className="btn primary">
          <Plus size={16} /> Novo Relatório
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
            Nenhum diário ou relatório registrado no sistema.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Código</th>
                  <th>Descrição da Ocorrência</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idRelatorio}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>LOG #{item.idRelatorio}</td>
                    <td style={{ verticalAlign: 'top', lineHeight: '1.4' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <FileText size={16} style={{ color: 'var(--cyan)', marginTop: '0.2rem', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.95rem' }}>{item.descricao}</span>
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/relatorio/editar/${item.idRelatorio}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idRelatorio)}
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
