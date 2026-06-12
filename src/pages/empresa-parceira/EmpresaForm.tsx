// src/pages/empresa-parceira/EmpresaForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { mockDb } from '../../services/mockDb';
import { Save, ArrowLeft, Building2, AlertCircle } from 'lucide-react';

export const EmpresaForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== undefined;

  const [nomeEmpresa, setNomeEmpresa] = useState<string>('');
  const [pais, setPais] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      try {
    
        if (isEdit) {
          const item = await mockDb.empresas.getById(parseInt(id));
          if (item) {
            setNomeEmpresa(item.nomeEmpresa);
            setPais(item.pais);
          } else {
            setError("Agência parceira não encontrada no banco central.");
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

    const trimmedNome = nomeEmpresa.trim();
    const trimmedPais = pais.trim();

    if (trimmedNome === '' || trimmedPais === '') {
      setError("Todos os campos de agência são obrigatórios.");
      return;
    }

    try {
      if (isEdit) {
        await mockDb.empresas.update(parseInt(id!), { nomeEmpresa: trimmedNome, pais: trimmedPais });
      } else {
        await mockDb.empresas.create({ nomeEmpresa: trimmedNome, pais: trimmedPais });
      }
      navigate('/empresa-parceira');
    } catch (err: any) {
      setError(err.message || "Erro ao salvar empresa parceira.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEdit ? 'EDITAR AGÊNCIA PARCEIRA' : 'NOVA AGÊNCIA PARCEIRA'}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isEdit ? 'Atualize as especificações e o país da corporação associada.' : 'Associe uma nova organização espacial internacional ao conselho da estação.'}
          </p>
        </div>
        <Link to="/empresa-parceira" className="btn secondary">
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
              <Building2 size={14} /> Nome da Agência / Empresa
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: ESA, Roscosmos, SpaceX, INPE"
              maxLength={45}
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>País / Nação de Origem</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Brasil, Japão, França, Alemanha"
              maxLength={45}
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn primary">
              <Save size={16} /> Salvar Parceria
            </button>
            <Link to="/empresa-parceira" className="btn secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
