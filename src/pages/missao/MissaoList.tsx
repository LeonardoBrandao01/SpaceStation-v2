// src/pages/missao/MissaoList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb, type Missao } from '../../services/mockDb';
import { Plus, Edit, Trash2, Compass, AlertTriangle, Calendar, User, Rocket, Flame, FileText } from 'lucide-react';

export const MissaoList: React.FC = () => {
  const [items, setItems] = useState<Missao[]>([]);
  const [relations, setRelations] = useState({
    empresas: {} as Record<number, string>,
    astronautas: {} as Record<number, string>,
    foguetes: {} as Record<number, string>,
    combustiveis: {} as Record<number, string>,
    relatorios: {} as Record<number, string>
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const missoes = mockDb.missoes.getAll();
    setItems(missoes);

    // Fetch related items to resolve IDs to names
    const emps = mockDb.empresas.getAll();
    const asts = mockDb.astronautas.getAll();
    const fogs = mockDb.foguetes.getAll();
    const fuels = mockDb.combustiveis.getAll();
    const rels = mockDb.relatorios.getAll();

    const empsMap: Record<number, string> = {};
    emps.forEach(e => empsMap[e.idEmpresaParceira] = e.nomeEmpresa);

    const astsMap: Record<number, string> = {};
    asts.forEach(a => astsMap[a.idAstronauta] = a.nomeAstro);

    const fogsMap: Record<number, string> = {};
    fogs.forEach(f => fogsMap[f.idFoguete] = f.nome);

    const fuelsMap: Record<number, string> = {};
    fuels.forEach(fu => fuelsMap[fu.idCombustivel] = `${fu.tipo} - ${fu.marca}`);

    const relsMap: Record<number, string> = {};
    rels.forEach(r => relsMap[r.idRelatorio] = r.descricao);

    setRelations({
      empresas: empsMap,
      astronautas: astsMap,
      foguetes: fogsMap,
      combustiveis: fuelsMap,
      relatorios: relsMap
    });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Deseja realmente abortar e excluir esta missão espacial?")) return;
    
    try {
      mockDb.missoes.delete(id);
      setSuccess("Missão excluída dos sistemas da estação.");
      setError(null);
      loadData();
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Erro ao excluir missão.");
      setSuccess(null);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">MISSÕES ESPACIAIS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Planejamento de voos, acoplamento de cargas, pesquisas e coordenação de tripulação.
          </p>
        </div>
        <Link to="/missao/novo" className="btn primary">
          <Plus size={16} /> Planejar Missão
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {items.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Compass size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-muted)' }}>Nenhuma missão orbital em andamento ou planejada.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.idMissao} className="glass-card" style={{ borderLeft: '4px solid var(--cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{item.nomeMissao}</h2>
                    <span className="badge success">Ativa</span>
                    <span className="badge purple" style={{ fontSize: '0.7rem' }}>ID: #{item.idMissao}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--cyan)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                    AGÊNCIA PARCEIRA: {relations.empresas[item.empresaParceira_idEmpresaParceira] || 'Carregando...'}
                  </p>
                </div>
                
                <div className="actions-cell">
                  <Link to={`/missao/editar/${item.idMissao}`} className="btn secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                    <Edit size={14} /> Editar
                  </Link>
                  <button 
                    className="btn danger" 
                    onClick={() => handleDelete(item.idMissao)}
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  >
                    <Trash2 size={14} /> Abortar
                  </button>
                </div>
              </div>

              {/* Mission Motive */}
              <div style={{ margin: '1.25rem 0', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  <strong>Motivo / Objetivo:</strong> {item.motivo}
                </p>
              </div>

              {/* Connections Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Calendar size={15} style={{ color: 'var(--cyan)' }} />
                  <span>Duração: <strong>{item.duracaoDias} dias</strong></span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <User size={15} style={{ color: 'var(--green)' }} />
                  <span>Astronauta: <strong>{relations.astronautas[item.astronauta_idAstronauta] || 'Não cadastrado'}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Rocket size={15} style={{ color: 'var(--purple)', transform: 'rotate(45deg)' }} />
                  <span>Foguete: <strong>{relations.foguetes[item.foguete_idFoguete] || 'Não cadastrado'}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <Flame size={15} style={{ color: 'var(--orange)' }} />
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={relations.combustiveis[item.foguete_combustivel_idCombustivel]}>
                    Combustível: <strong>{relations.combustiveis[item.foguete_combustivel_idCombustivel]?.split(' - ')[0] || 'Não cadastrado'}</strong>
                  </span>
                </div>
              </div>

              {/* Associated Report */}
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <FileText size={14} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                <span style={{ fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  <strong>Diário de Bordo Vinculado:</strong> {relations.relatorios[item.relatorio_idRelatorio] || 'Sem descrição.'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
