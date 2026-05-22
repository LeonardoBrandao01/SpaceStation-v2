// src/pages/especialidade/EspecialidadeForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb } from '../../services/mockDb';
import { Save, ArrowLeft, Award, AlertCircle } from 'lucide-react';

export const EspecialidadeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  const [nome, setNome] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      const item = mockDb.especialidades.getById(parseInt(id));
      if (item) {
        setNome(item.nome);
      } else {
        setError("Especialidade não encontrada nos bancos da estação.");
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedNome = nome.trim();
    if (trimmedNome === '') {
      setError("Nome da especialidade é obrigatório.");
      return;
    }

    try {
      if (isEdit) {
        mockDb.especialidades.update(parseInt(id!), { nome: trimmedNome });
      } else {
        mockDb.especialidades.create({ nome: trimmedNome });
      }
      navigate('/especialidade');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar especialidade.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR ESPECIALIDADE' : 'NOVA ESPECIALIDADE'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Atualize as especificações do setor de atuação tripulante.' : 'Defina uma nova área científica ou técnica para os astronautas.'}
          </p>
        </div>
        <Link to="/especialidade" className="btn secondary">
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
              <Award size={14} /> Nome da Especialidade
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Engenharia Nuclear, Bio-Modulação, Piloto de Reentrada"
              maxLength={45}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary">
              <Save size={16} /> Salvar Registro
            </button>
            <Link to="/especialidade" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
