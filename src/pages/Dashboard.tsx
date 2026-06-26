// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { mockDb } from '../services/mockDb';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  Compass, 
  Rocket, 
  Users, 
  Wind, 
  Thermometer, 
  Activity, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<{
    estacoes: number;
    missoes: number;
    foguetes: number;
    astronautas: number | string;
  }>({
    estacoes: 0,
    missoes: 0,
    foguetes: 0,
    astronautas: 0
  });

  const [activeStation, setActiveStation] = useState<any>(null);
  const [o2Level, setO2Level] = useState<number>(0);
  const [o2Max] = useState<number>(2000); // 2000L max capacity
  const [temp, setTemp] = useState<number>(21.5);
  const [recentMissions, setRecentMissions] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const ests = await mockDb.estacoes.getAll();
        const miss = await mockDb.missoes.getAll();
        const fogs = await mockDb.foguetes.getAll();
        
        let astsCount: number | string = 0;
        try {
          const asts = await mockDb.astronautas.getAll();
          astsCount = asts.length;
        } catch (e) {
          console.warn("Acesso restrito ao quantitativo de astronautas para este perfil.");
          astsCount = '🔒 Restrito';
        }

        setStats({
          estacoes: ests.length,
          missoes: miss.length,
          foguetes: fogs.length,
          astronautas: astsCount
        });

        // Find the first active station to display telemetries
        const active = ests.find(e => e.estaAtiva) || ests[0];
        if (active) {
          setActiveStation(active);
          setTemp(active.temperatura);
          
          // Get associated oxygen log
          const o2Log = await mockDb.oxigenios.getById(active.oxigenio_idOxigenio);
          if (o2Log) {
            setO2Level(o2Log.quantidadeAbastecida);
          } else {
            setO2Level(1200);
          }
        } else {
          setO2Level(1500);
        }

        // Set recent missions
        setRecentMissions(miss.slice(-3).reverse());
      } catch (error) {
        console.error("Erro ao carregar dados de telemetria:", error);
      }
    };

    loadDashboardData();
  }, []);

  // Calculate percentage of O2
  const o2Percent = Math.min(100, Math.max(0, Math.round((o2Level / o2Max) * 100)));
  const strokeDashoffset = 377 - (377 * o2Percent) / 100;

  // Simple telemetry ticker effect
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate minor fluctuations in temperature and oxygen
      setTemp(prev => {
        const delta = (Math.random() - 0.5) * 0.2;
        return parseFloat((prev + delta).toFixed(1));
      });
      setO2Level(prev => {
        const delta = Math.random() > 0.8 ? -1 : 0;
        const newVal = prev + delta;
        return Math.max(0, newVal);
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">PAINEL DE TELEMETRIA</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Dados de órbita e monitoramento vital da estação espacial.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cyan)' }}>
          <ShieldCheck size={18} />
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>SEGURANÇA DA SESSÃO ATIVA</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid stats">
        <div className="glass-card stat-card">
          <div className="stat-icon-container cyan">
            <Radio size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Estações</span>
            <span className="stat-value">{stats.estacoes}</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-container green">
            <Compass size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Missões</span>
            <span className="stat-value">{stats.missoes}</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-container purple">
            <Rocket size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Foguetes</span>
            <span className="stat-value">{stats.foguetes}</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-container orange">
            <Users size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tripulantes</span>
            <span className="stat-value">{stats.astronautas}</span>
          </div>
        </div>
      </div>

      {/* Main Telemetry & Details Grid */}
      <div className="dashboard-grid telemetry">
        {/* Left Section - Vital Monitoring */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Activity size={18} style={{ color: 'var(--cyan)' }} />
              STATUS VITAL DO MÓDULO: {activeStation?.nome || 'Nenhum Módulo Ativo'}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Monitor de telemetria interna e gases atmosféricos de suporte à vida.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="form-grid two-cols">
            {/* Oxygen level circular widget */}
            <div className="oxygen-widget glass-card" style={{ borderStyle: 'dashed' }}>
              <div className="radial-progress">
                <svg>
                  <circle className="radial-circle-bg" cx="70" cy="70" r="60" />
                  <circle 
                    className="radial-circle-val" 
                    cx="70" 
                    cy="70" 
                    r="60" 
                    style={{ strokeDashoffset }} 
                  />
                </svg>
                <div className="radial-text">
                  <span>{o2Percent}%</span>
                  <span className="radial-sub">Nível O₂</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', color: 'var(--cyan)' }}>
                  <Wind size={16} />
                  <strong style={{ fontFamily: 'var(--font-mono)' }}>{o2Level} L</strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Suporte respiratório ativo para a tripulação.
                </p>
              </div>
            </div>

            {/* Temperature and Modules widget */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Thermometer size={16} style={{ color: 'var(--orange)' }} />
                    TEMPERATURA INTERNA
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: temp > 24 ? 'var(--red)' : 'var(--text-primary)' }}>
                    {temp} °C
                  </span>
                </div>
                <div className="temp-gauge">
                  <div className="temp-fill" style={{ width: `${Math.min(100, Math.max(0, ((temp - 10) / 20) * 100))}%` }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span>Min: 10°C</span>
                  <span>Ideal: 21°C</span>
                  <span>Max: 30°C</span>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>MÓDULOS ACOPLADOS</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: 'var(--cyan)' }}>
                    {activeStation?.quantidadeModulos || '0'} Módulos
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Sensores confirmam integridade estrutural e conexão elétrica ativa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Recent Missions & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Recent Missions Feed */}
          <div className="glass-card" style={{ flexGrow: 1 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>
              MISSÕES RECENTES
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentMissions.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nenhuma missão agendada.</p>
              ) : (
                recentMissions.map((m) => (
                  <div 
                    key={m.idMissao} 
                    style={{ 
                      paddingBottom: '0.75rem', 
                      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.nomeMissao}</span>
                      <span className="badge success" style={{ fontSize: '0.65rem' }}>Ativa</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Duração: <strong style={{ color: 'var(--cyan)' }}>{m.duracaoDias} dias</strong>
                    </span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.motivo}
                    </p>
                  </div>
                ))
              )}
            </div>
            <Link 
              to="/missao" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.25rem', 
                fontSize: '0.8rem', 
                marginTop: '1rem',
                color: 'var(--cyan)'
              }}
            >
              Ver todas as missões <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Quick Actions Console */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>
              CONSOLES DE CADASTRO
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/missao/novo" className="btn primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                Nova Missão Espacial
              </Link>
              <Link to="/estacao/novo" className="btn secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                Acoplar Nova Estação
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
