// src/pages/estacao/EstacaoList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Estacao } from '../../services/mockDb';
import { Plus, Edit, Trash2, Radio, AlertTriangle, Thermometer, Wind, Compass } from 'lucide-react';

export const EstacaoList: React.FC = () => {
  const [items, setItems] = useState<Estacao[]>([]);
  const [missionsMap, setMissionsMap] = useState<Record<number, string>>({});
  const [oxygenMap, setOxygenMap] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setItems(await mockDb.estacoes.getAll());

    const missions = await mockDb.missoes.getAll();
    const missMap: Record<number, string> = {};
    missions.forEach(m => {
      missMap[m.idMissao] = m.nomeMissao;
    });
    setMissionsMap(missMap);

    const oxygens = await mockDb.oxigenios.getAll();
    const oxyMap: Record<number, string> = {};
    oxygens.forEach(o => {
      oxyMap[o.idOxigenio] = `${o.quantidadeAbastecida}L (${o.estado})`;
    });
    setOxygenMap(oxyMap);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente desacoplar e remover esta estação espacial de órbita?")) return;
    
    try {
      await mockDb.estacoes.delete(id);
      setSuccess("Estação espacial desacoplada do centro orbital.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar estação.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">ESTAÇÕES ESPACIAIS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Registro e acoplamento de estações orbitais e controle de suporte vital e energia.
          </p>
        </div>
        <Link to="/estacao/novo" className="btn primary">
          <Plus size={16} /> Nova Estação
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
            Nenhuma estação espacial acoplada no momento.
          </p>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Nome da Estação</th>
                  <th>Módulos</th>
                  <th>Missão Associada</th>
                  <th>Temperatura</th>
                  <th>Oxigênio Atmosférico</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.idEstacao}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>STA #{item.idEstacao}</td>
                    <td style={{ fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div 
                          className="status-dot" 
                          style={{ 
                            backgroundColor: item.estaAtiva ? 'var(--green)' : 'var(--text-muted)',
                            boxShadow: item.estaAtiva ? '0 0 8px var(--green)' : 'none',
                            animation: item.estaAtiva ? 'pulse-green 2s infinite' : 'none'
                          }}
                        />
                        <Radio size={16} style={{ color: item.estaAtiva ? 'var(--cyan)' : 'var(--text-muted)' }} />
                        <span>{item.nome}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{item.quantidadeModulos} un</td>
                    <td>
                      <span className="badge purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Compass size={10} />
                        {missionsMap[item.missao_idMissao] || `Missão Desconhecida (ID: ${item.missao_idMissao})`}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        color: item.temperatura > 24 ? 'var(--red)' : item.temperatura < 15 ? 'var(--cyan)' : 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        <Thermometer size={14} />
                        {item.temperatura} °C
                      </span>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                        <Wind size={14} style={{ color: 'var(--cyan)' }} />
                        {oxygenMap[item.oxigenio_idOxigenio] || `Lote Inválido (ID: ${item.oxigenio_idOxigenio})`}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'center' }}>
                        <Link to={`/estacao/editar/${item.idEstacao}`} className="btn-icon" title="Editar">
                          <Edit size={16} />
                        </Link>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDelete(item.idEstacao)}
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
