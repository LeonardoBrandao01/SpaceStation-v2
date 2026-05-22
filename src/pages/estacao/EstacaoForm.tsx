// src/pages/estacao/EstacaoForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb, type Missao, type Oxigenio } from '../../services/mockDb';
import { Save, ArrowLeft, Radio, AlertCircle, Info } from 'lucide-react';

export const EstacaoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  // Form Fields
  const [nome, setNome] = useState<string>('');
  const [quantidadeModulos, setQuantidadeModulos] = useState<string>('');
  const [temperatura, setTemperatura] = useState<string>('');
  const [estaAtiva, setEstaAtiva] = useState<boolean>(true);
  const [missaoId, setMissaoId] = useState<number>(0);
  const [oxigenioId, setOxigenioId] = useState<number>(0);

  // Dropdown datasets
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [oxigenios, setOxigenios] = useState<Oxigenio[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load datasets
    setMissoes(mockDb.missoes.getAll());
    setOxigenios(mockDb.oxigenios.getAll());

    if (isEdit) {
      const item = mockDb.estacoes.getById(parseInt(id));
      if (item) {
        setNome(item.nome);
        setQuantidadeModulos(item.quantidadeModulos);
        setTemperatura(item.temperatura.toString());
        setEstaAtiva(item.estaAtiva);
        setMissaoId(item.missao_idMissao);
        setOxigenioId(item.oxigenio_idOxigenio);
      } else {
        setError("Estação espacial não encontrada.");
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedNome = nome.trim();
    const modulesVal = quantidadeModulos.trim();
    const tempVal = parseFloat(temperatura);

    if (trimmedNome === '' || modulesVal === '' || isNaN(tempVal)) {
      setError("Verifique os campos inseridos. Nome, módulos e temperatura são obrigatórios.");
      return;
    }

    if (missaoId <= 0 || oxigenioId <= 0) {
      setError("Selecione uma Missão ativa e um Lote de Oxigênio cadastrado.");
      return;
    }

    // Retrieve selected mission details to fill foreign-key values
    const selectedMission = mockDb.missoes.getById(missaoId);
    if (!selectedMission) {
      setError("A missão selecionada não foi encontrada na base.");
      return;
    }

    try {
      const payload = {
        nome: trimmedNome,
        quantidadeModulos: modulesVal,
        estaAtiva,
        temperatura: tempVal,
        missao_idMissao: missaoId,
        missao_empresaParceira_idEmpresaParceira: selectedMission.empresaParceira_idEmpresaParceira,
        missao_astronauta_idAstronauta: selectedMission.astronauta_idAstronauta,
        missao_foguete_idFoguete: selectedMission.foguete_idFoguete,
        missao_foguete_combustivel_idCombustivel: selectedMission.foguete_combustivel_idCombustivel,
        oxigenio_idOxigenio: oxigenioId
      };

      if (isEdit) {
        mockDb.estacoes.update(parseInt(id!), payload);
      } else {
        mockDb.estacoes.create(payload);
      }
      navigate('/estacao');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar a estação espacial.");
    }
  };

  const isMissingDeps = missoes.length === 0 || oxigenios.length === 0;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR ESTAÇÃO ESPACIAL' : 'ACOPLAR NOVA ESTAÇÃO'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Modifique os módulos ou parâmetros vitais da estação.' : 'Associe uma missão em andamento e configure os tanques de suporte de suporte à vida.'}
          </p>
        </div>
        <Link to="/estacao" className="btn secondary">
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
            ⚠️ <strong>Dependências Ausentes:</strong> Você precisa cadastrar pelo menos uma <strong>Missão</strong> 
            e um <strong>Lote de Oxigênio</strong> antes de registrar uma estação espacial.
          </div>
        </div>
      )}

      <div className="glass-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Radio size={14} /> Nome da Estação
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: ISS (Estação Espacial Internacional), Tiangong"
              maxLength={45}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-grid two-cols">
            <div className="form-group">
              <label>Quantidade de Módulos</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: 8, 12 Módulos"
                maxLength={45}
                value={quantidadeModulos}
                onChange={(e) => setQuantidadeModulos(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Temperatura Média (°C)</label>
              <input
                type="number"
                step="any"
                className="form-control"
                placeholder="Ex: 21.5, 18.0"
                value={temperatura}
                onChange={(e) => setTemperatura(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-grid two-cols">
            <div className="form-group">
              <label>Missão Vinculada</label>
              <select
                className="form-control"
                value={missaoId}
                onChange={(e) => setMissaoId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione a Missão</option>
                {missoes.map(m => (
                  <option key={m.idMissao} value={m.idMissao}>
                    {m.nomeMissao}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Carga de Oxigênio (O₂)</label>
              <select
                className="form-control"
                value={oxigenioId}
                onChange={(e) => setOxigenioId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione o Lote de O₂</option>
                {oxigenios.map(o => (
                  <option key={o.idOxigenio} value={o.idOxigenio}>
                    Lote #{o.idOxigenio} - {o.quantidadeAbastecida}L ({o.estado})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <input
              type="checkbox"
              id="active-chk"
              checked={estaAtiva}
              onChange={(e) => setEstaAtiva(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: 'var(--cyan)',
                cursor: 'pointer'
              }}
            />
            <label 
              htmlFor="active-chk" 
              style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-secondary)', 
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              Estação em Operação Ativa
            </label>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary" disabled={isMissingDeps}>
              <Save size={16} /> Acoplar Estação
            </button>
            <Link to="/estacao" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
