// src/pages/relatorio/RelatorioForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb } from '../../services/mockDb';
import { Save, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

export const RelatorioForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  const [descricao, setDescricao] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      try {
    
        if (isEdit) {
          const item = await mockDb.relatorios.getById(parseInt(id));
          if (item) {
            setDescricao(item.descricao);
          } else {
            setError("Relatório não encontrado no banco de dados.");
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

    const trimmedDesc = descricao.trim();
    if (trimmedDesc === '') {
      setError("A descrição do relatório de bordo não pode estar em branco.");
      return;
    }

    try {
      if (isEdit) {
        await mockDb.relatorios.update(parseInt(id!), { descricao: trimmedDesc });
      } else {
        await mockDb.relatorios.create({ descricao: trimmedDesc });
      }
      navigate('/relatorio');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar relatório.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR RELATÓRIO' : 'NOVO RELATÓRIO'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Modifique os registros e telemetria da missão selecionada.' : 'Escreva os detalhes das observações de voo ou eventos científicos da estação.'}
          </p>
        </div>
        <Link to="/relatorio" className="btn secondary">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      {error && (
        <div className="alert danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="glass-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={14} /> Relatório / Descrição Científica
            </label>
            <textarea
              className="form-control"
              placeholder="Digite o diário de bordo aqui. Detalhe sistemas pressurizados, experimentos, órbitas..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={8}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary">
              <Save size={16} /> Registrar no Diário de Bordo
            </button>
            <Link to="/relatorio" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
