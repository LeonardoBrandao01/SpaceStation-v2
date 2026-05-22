// src/pages/combustivel/CombustivelForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb } from '../../services/mockDb';
import { Save, ArrowLeft, Flame, AlertCircle } from 'lucide-react';

export const CombustivelForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  const [tipo, setTipo] = useState<string>('');
  const [marca, setMarca] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      const item = mockDb.combustiveis.getById(parseInt(id));
      if (item) {
        setTipo(item.tipo);
        setMarca(item.marca);
      } else {
        setError("Combustível não localizado na base.");
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedTipo = tipo.trim();
    const trimmedMarca = marca.trim();

    if (trimmedTipo === '' || trimmedMarca === '') {
      setError("Todos os campos do propelente são obrigatórios.");
      return;
    }

    try {
      if (isEdit) {
        mockDb.combustiveis.update(parseInt(id!), { tipo: trimmedTipo, marca: trimmedMarca });
      } else {
        mockDb.combustiveis.create({ tipo: trimmedTipo, marca: trimmedMarca });
      }
      navigate('/combustivel');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar combustível.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR COMBUSTÍVEL' : 'NOVO COMBUSTÍVEL'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Modifique os parâmetros do composto químico de propulsão.' : 'Insira as especificações de um novo tipo de propelente.'}
          </p>
        </div>
        <Link to="/combustivel" className="btn secondary">
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
              <Flame size={14} /> Tipo de Combustível
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Metano Líquido + LOX, Xenônio Ionizado"
              maxLength={45}
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Marca / Fabricante</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Aerojet Rocketdyne, SpaceX Propellants"
              maxLength={45}
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary">
              <Save size={16} /> Salvar Registro
            </button>
            <Link to="/combustivel" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
