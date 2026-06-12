// src/pages/oxigenio/OxigenioForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb } from '../../services/mockDb';
import { Save, ArrowLeft, Wind, AlertCircle } from 'lucide-react';

export const OxigenioForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  const [quantidade, setQuantidade] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      try {
    
        if (isEdit) {
          const item = await mockDb.oxigenios.getById(parseInt(id));
          if (item) {
            setQuantidade(item.quantidadeAbastecida.toString());
            setEstado(item.estado);
          } else {
            setError("Lote de oxigênio não encontrado.");
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

    const quantVal = parseFloat(quantidade);
    const trimmedEstado = estado.trim();

    if (isNaN(quantVal) || quantVal <= 0) {
      setError("A quantidade abastecida de O₂ precisa ser um número decimal válido maior que zero.");
      return;
    }

    if (trimmedEstado === '') {
      setError("O estado do suprimento é obrigatório.");
      return;
    }

    try {
      const payload = {
        quantidadeAbastecida: quantVal,
        estado: trimmedEstado
      };

      if (isEdit) {
        await mockDb.oxigenios.update(parseInt(id!), payload);
      } else {
        await mockDb.oxigenios.create(payload);
      }
      navigate('/oxigenio');
    } catch (err: any) {
      setError(err.message || "Erro ao registrar oxigênio.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR ABASTECIMENTO DE O₂' : 'REGISTRAR ABASTECIMENTO DE O₂'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Modifique os dados de cubagem e estabilidade do gás.' : 'Registre um novo reabastecimento atmosférico de oxigênio de suporte à vida.'}
          </p>
        </div>
        <Link to="/oxigenio" className="btn secondary">
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
              <Wind size={14} /> Quantidade Abastecida (Litros)
            </label>
            <input
              type="number"
              step="any"
              min="0.1"
              className="form-control"
              placeholder="Ex: 1500.5, 980"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Estado do Suprimento</label>
            <select
              className="form-control"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="">Selecione o Estado Vital</option>
              <option value="Excelente">Excelente (Pressão Máxima)</option>
              <option value="Estável">Estável (Operação Normal)</option>
              <option value="Médio">Médio (Requer Monitoramento)</option>
              <option value="Alerta Crítico">Alerta Crítico (Esvaziando)</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary">
              <Save size={16} /> Salvar Registro
            </button>
            <Link to="/oxigenio" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
