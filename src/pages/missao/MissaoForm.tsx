// src/pages/missao/MissaoForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb, type EmpresaParceira, type Astronauta, type Foguete, type Combustivel, type Relatorio } from '../../services/mockDb';
import { Save, ArrowLeft, Compass, AlertCircle, Info } from 'lucide-react';

export const MissaoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  // Form Fields
  const [nomeMissao, setNomeMissao] = useState<string>('');
  const [duracaoDias, setDuracaoDias] = useState<string>('');
  const [motivo, setMotivo] = useState<string>('');

  const [empresaId, setEmpresaId] = useState<number>(0);
  const [astronautaId, setAstronautaId] = useState<number>(0);
  const [fogueteId, setFogueteId] = useState<number>(0);
  const [combustivelId, setCombustivelId] = useState<number>(0);
  const [relatorioId, setRelatorioId] = useState<number>(0);

  // Lists for Dropdowns
  const [empresas, setEmpresas] = useState<EmpresaParceira[]>([]);
  const [astronautas, setAstronautas] = useState<Astronauta[]>([]);
  const [foguetes, setFoguetes] = useState<Foguete[]>([]);
  const [combustiveis, setCombustiveis] = useState<Combustivel[]>([]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load lists
    setEmpresas(mockDb.empresas.getAll());
    setAstronautas(mockDb.astronautas.getAll());
    setFoguetes(mockDb.foguetes.getAll());
    setCombustiveis(mockDb.combustiveis.getAll());
    setRelatorios(mockDb.relatorios.getAll());

    if (isEdit) {
      const item = mockDb.missoes.getById(parseInt(id));
      if (item) {
        setNomeMissao(item.nomeMissao);
        setDuracaoDias(item.duracaoDias.toString());
        setMotivo(item.motivo);
        setEmpresaId(item.empresaParceira_idEmpresaParceira);
        setAstronautaId(item.astronauta_idAstronauta);
        setFogueteId(item.foguete_idFoguete);
        setCombustivelId(item.foguete_combustivel_idCombustivel);
        setRelatorioId(item.relatorio_idRelatorio);
      } else {
        setError("Missão espacial não encontrada nos servidores centrais.");
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedNome = nomeMissao.trim();
    const durNum = parseInt(duracaoDias);
    const trimmedMotivo = motivo.trim();

    if (trimmedNome === '' || isNaN(durNum) || durNum <= 0 || trimmedMotivo === '') {
      setError("Verifique os dados. O nome e motivo são obrigatórios, e a duração precisa ser > 0.");
      return;
    }

    if (empresaId <= 0 || astronautaId <= 0 || fogueteId <= 0 || combustivelId <= 0 || relatorioId <= 0) {
      setError("Por favor, selecione todas as referências associadas à missão (empresa, astronauta, foguete, combustível e relatório).");
      return;
    }

    try {
      const payload = {
        nomeMissao: trimmedNome,
        duracaoDias: durNum,
        motivo: trimmedMotivo,
        empresaParceira_idEmpresaParceira: empresaId,
        astronauta_idAstronauta: astronautaId,
        foguete_idFoguete: fogueteId,
        foguete_combustivel_idCombustivel: combustivelId,
        relatorio_idRelatorio: relatorioId
      };

      if (isEdit) {
        mockDb.missoes.update(parseInt(id!), payload);
      } else {
        mockDb.missoes.create(payload);
      }
      navigate('/missao');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar planejamento da missão.");
    }
  };

  // If missing dependencies warning
  const isMissingDeps = 
    empresas.length === 0 || 
    astronautas.length === 0 || 
    foguetes.length === 0 || 
    combustiveis.length === 0 || 
    relatorios.length === 0;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR PLANEJAMENTO DE MISSÃO' : 'PLANEJAR NOVA MISSÃO'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Modifique os vetores de lançamento e a tripulação orbital.' : 'Crie um plano completo de voo orbital associando tripulação, combustível e veículos.'}
          </p>
        </div>
        <Link to="/missao" className="btn secondary">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      {error && (
        <div className="alert danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {isMissingDeps && (
        <div className="alert warning">
          <Info size={18} />
          <div>
            ⚠️ <strong>Dependências Ausentes:</strong> Você precisa cadastrar pelo menos uma <strong>Empresa</strong>, 
            um <strong>Astronauta</strong>, um <strong>Foguete</strong>, um <strong>Combustível</strong> e um <strong>Relatório</strong> 
            antes de criar uma Missão.
          </div>
        </div>
      )}

      <div className="glass-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-grid two-cols">
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Compass size={14} /> Nome da Missão
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: Artemis IV, Expedição 71"
                maxLength={45}
                value={nomeMissao}
                onChange={(e) => setNomeMissao(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Duração (dias inteiros)</label>
              <input
                type="number"
                min="1"
                className="form-control"
                placeholder="Ex: 45, 180"
                value={duracaoDias}
                onChange={(e) => setDuracaoDias(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Objetivo / Motivo</label>
            <textarea
              className="form-control"
              placeholder="Descreva o propósito da missão espacial, incluindo experimentos a serem realizados e órbitas..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="form-grid two-cols">
            <div className="form-group">
              <label>Empresa / Agência Parceira</label>
              <select
                className="form-control"
                value={empresaId}
                onChange={(e) => setEmpresaId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione a Agência</option>
                {empresas.map(e => (
                  <option key={e.idEmpresaParceira} value={e.idEmpresaParceira}>
                    {e.nomeEmpresa} ({e.pais})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Astronauta Responsável</label>
              <select
                className="form-control"
                value={astronautaId}
                onChange={(e) => setAstronautaId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione o Astronauta</option>
                {astronautas.map(a => (
                  <option key={a.idAstronauta} value={a.idAstronauta}>
                    {a.nomeAstro} ({a.pais})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid two-cols">
            <div className="form-group">
              <label>Foguete / Propulsor de Lançamento</label>
              <select
                className="form-control"
                value={fogueteId}
                onChange={(e) => setFogueteId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione o Foguete</option>
                {foguetes.map(f => (
                  <option key={f.idFoguete} value={f.idFoguete}>
                    {f.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Propelente Químico (Combustível)</label>
              <select
                className="form-control"
                value={combustivelId}
                onChange={(e) => setCombustivelId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione o Combustível</option>
                {combustiveis.map(c => (
                  <option key={c.idCombustivel} value={c.idCombustivel}>
                    {c.tipo} ({c.marca})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Relatório / Diário de Bordo Vinculado</label>
            <select
              className="form-control"
              value={relatorioId}
              onChange={(e) => setRelatorioId(parseInt(e.target.value))}
              required
            >
              <option value="">Selecione o Relatório</option>
              {relatorios.map(r => (
                <option key={r.idRelatorio} value={r.idRelatorio}>
                  Relatório #{r.idRelatorio} - {r.descricao.substring(0, 60)}...
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary" disabled={isMissingDeps}>
              <Save size={16} /> Salvar Planejamento
            </button>
            <Link to="/missao" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        <Info size={14} />
        <span>Dica: Assegure-se de que os dados de suporte (Empresas, Astronautas, Foguetes, Combustíveis e Relatórios) estão cadastrados e corretos.</span>
      </div>
    </div>
  );
};
