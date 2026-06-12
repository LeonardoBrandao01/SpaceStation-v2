// src/pages/astronauta/AstronautaForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb, type Especialidade } from '../../services/mockDb';
import { useAuth } from '../../context/AuthContext';
import { Save, ArrowLeft, Users, AlertCircle, ShieldAlert } from 'lucide-react';

export const AstronautaForm: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  const [nomeAstro, setNomeAstro] = useState<string>('');
  const [pais, setPais] = useState<string>('');
  const [especialidadeId, setEspecialidadeId] = useState<number>(0);
  
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      try {
    
        if (isAdmin) {
          // Load specialties for dropdown
          setEspecialidades(await mockDb.especialidades.getAll());
    
          if (isEdit) {
            const item = await mockDb.astronautas.getById(parseInt(id));
            if (item) {
              setNomeAstro(item.nomeAstro);
              setPais(item.pais);
              setEspecialidadeId(item.especialidade_idEspecialidade);
            } else {
              setError("Astronauta não localizado nos registros centrais.");
            }
          }
        }
      
      } catch (err: any) {
        setError(err.message || "Erro ao carregar dados.");
      }
    };
    loadFormData();
  }, [id, isEdit, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedNome = nomeAstro.trim();
    const trimmedPais = pais.trim();

    if (trimmedNome === '' || trimmedPais === '' || especialidadeId <= 0) {
      setError("Todos os campos do astronauta são obrigatórios.");
      return;
    }

    try {
      const payload = {
        nomeAstro: trimmedNome,
        pais: trimmedPais,
        especialidade_idEspecialidade: especialidadeId
      };

      if (isEdit) {
        await mockDb.astronautas.update(parseInt(id!), payload);
      } else {
        await mockDb.astronautas.create(payload);
      }
      navigate('/astronauta');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar astronauta.");
    }
  };

  // If not admin, show restricted screen
  if (!isAdmin) {
    return (
      <div className="glass-panel restricted-page-container">
        <ShieldAlert size={64} className="restricted-icon" />
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--orange)' }}>ACESSO RESTRITO</h2>
        <p style={{ maxWidth: '500px', color: 'var(--text-secondary)' }}>
          Este formulário contém registros de segurança de tripulação ativa. 
          Apenas oficiais administradores possuem privilégios de escrita.
        </p>
        <Link to="/" className="btn primary" style={{ marginTop: '1rem' }}>
          Voltar ao Painel Principal
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR TRIPULANTE' : 'CADASTRAR TRIPULANTE'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Modifique os dados cadastrais e especialização do astronauta.' : 'Preencha os dados e atribua a especialidade espacial do novo tripulante.'}
          </p>
        </div>
        <Link to="/astronauta" className="btn secondary">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      {error && (
        <div className="alert danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="glass-card" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={14} /> Nome Completo
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Yuri Gagarin, Sally Ride"
              maxLength={45}
              value={nomeAstro}
              onChange={(e) => setNomeAstro(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Nacionalidade / País</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Brasil, Estados Unidos, Itália"
              maxLength={45}
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Especialidade de Atuação</label>
            {especialidades.length === 0 ? (
              <div style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>
                ⚠️ Nenhuma especialidade cadastrada. Cadastre primeiro uma especialidade na aba <Link to="/especialidade">Especialidades</Link>.
              </div>
            ) : (
              <select
                className="form-control"
                value={especialidadeId}
                onChange={(e) => setEspecialidadeId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione a Especialidade</option>
                {especialidades.map(s => (
                  <option key={s.idEspecialidade} value={s.idEspecialidade}>
                    {s.nome}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary" disabled={especialidades.length === 0}>
              <Save size={16} /> Salvar Tripulante
            </button>
            <Link to="/astronauta" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
