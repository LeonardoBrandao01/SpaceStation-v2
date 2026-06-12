// src/pages/foguete/FogueteList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Foguete } from '../../services/mockDb';
import { Plus, Edit, Trash2, Rocket, AlertTriangle, Info } from 'lucide-react';

export const FogueteList: React.FC = () => {
  const [items, setItems] = useState<Foguete[]>([]);
  const [combustiveisMap, setCombustiveisMap] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setItems(await mockDb.foguetes.getAll());

    // Map fuels for easy access in display join
    const fuels = await mockDb.combustiveis.getAll();
    const map: Record<number, string> = {};
    fuels.forEach(f => {
      map[f.idCombustivel] = `${f.tipo} (${f.marca})`;
    });
    setCombustiveisMap(map);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente arquivar este veículo de lançamento?")) return;
    
    try {
      await mockDb.foguetes.delete(id);
      setSuccess("Foguete removido com sucesso.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar foguete.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">VEÍCULOS DE LANÇAMENTO (FOGUETES)</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Lista de foguetes homologados para missões orbitais e transporte de cargas/tripulação.
          </p>
        </div>
        <Link to="/foguete/novo" className="btn primary">
          <Plus size={16} /> Novo Foguete
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
            Nenhum veículo propulsor listado nos hangares da estação.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Nome do Foguete</th>
                  <th>Tipo de Combustível</th>
                  <th>Base de Lançamento</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idFoguete}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>#{item.idFoguete}</td>
                    <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Rocket size={16} style={{ color: 'var(--purple)', transform: 'rotate(45deg)' }} />
                      {item.nome}
                    </td>
                    <td style={{ fontSize: '0.9rem' }}>
                      {combustiveisMap[item.combustivel_idCombustivel] || (
                        <span style={{ color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          ⚠️ Combustível Inválido (ID: {item.combustivel_idCombustivel})
                        </span>
                      )}
                    </td>
                    <td>{item.localLancamento}</td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/foguete/editar/${item.idFoguete}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idFoguete)}
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <Info size={14} />
        <span>Aviso: O combustível correspondente precisa estar cadastrado antes de registrar o veículo.</span>
      </div>
    </div>
  );
};
