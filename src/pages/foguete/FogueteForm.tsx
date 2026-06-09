// src/pages/foguete/FogueteForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb, type Combustivel } from '../../services/mockDb';
import { Save, ArrowLeft, Rocket, AlertCircle } from 'lucide-react';

export const FogueteForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  const [nome, setNome] = useState<string>('');
  const [combustivelId, setCombustivelId] = useState<number>(0);
  const [localLancamento, setLocalLancamento] = useState<string>('');
  
  const [combustiveis, setCombustiveis] = useState<Combustivel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      try {
    
        // Load fuels for selection
        const fuels = await mockDb.combustiveis.getAll();
        setCombustiveis(fuels);
    
        if (isEdit) {
          const item = await mockDb.foguetes.getById(parseInt(id));
          if (item) {
            setNome(item.nome);
            setCombustivelId(item.combustivel_idCombustivel);
            setLocalLancamento(item.localLancamento);
          } else {
            setError("Foguete não localizado no banco central.");
          }
        }
      
      } catch (err: any) {
        setError(err.message || "Erro ao carregar dados.");
      }
    };
    loadFormData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedNome = nome.trim();
    const trimmedLocal = localLancamento.trim();

    if (trimmedNome === '' || trimmedLocal === '' || combustivelId <= 0) {
      setError("Todos os campos do veículo propulsor são obrigatórios.");
      return;
    }

    try {
      const payload = {
        nome: trimmedNome,
        combustivel_idCombustivel: combustivelId,
        localLancamento: trimmedLocal
      };

      if (isEdit) {
        await mockDb.foguetes.update(parseInt(id!), payload);
      } else {
        await mockDb.foguetes.create(payload);
      }
      navigate('/foguete');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar foguete.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR VEÍCULO DE LANÇAMENTO' : 'NOVO VEÍCULO DE LANÇAMENTO'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Atualize as especificações e a base de lançamento do foguete.' : 'Associe um novo foguete e combustível para futuras missões orbitais.'}
          </p>
        </div>
        <Link to="/foguete" className="btn secondary">
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
              <Rocket size={14} style={{ transform: 'rotate(45deg)' }} /> Nome do Foguete
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Falcon Heavy, Saturn V, Ariane 6"
              maxLength={45}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Combustível Associado</label>
            {combustiveis.length === 0 ? (
              <div style={{ fontSize: '0.85rem', color: 'var(--orange)' }}>
                ⚠️ Nenhum combustível cadastrado. Cadastre primeiro um combustível na aba <Link to="/combustivel">Combustíveis</Link>.
              </div>
            ) : (
              <select
                className="form-control"
                value={combustivelId}
                onChange={(e) => setCombustivelId(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione o Propelente</option>
                {combustiveis.map(f => (
                  <option key={f.idCombustivel} value={f.idCombustivel}>
                    {f.tipo} ({f.marca})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Base / Local de Lançamento</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Alcântara - MA (Brasil), Cape Canaveral (EUA)"
              maxLength={45}
              value={localLancamento}
              onChange={(e) => setLocalLancamento(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary" disabled={combustiveis.length === 0}>
              <Save size={16} /> Salvar Foguete
            </button>
            <Link to="/foguete" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
