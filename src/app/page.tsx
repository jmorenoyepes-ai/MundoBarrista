'use client';

// ============================================
// MundoBarrista — Centro de Partidos (Matchday)
// Filtro por Jornada (1-19) y Estado (Todos, En Vivo, Finalizados)
// ============================================

import { useState, useEffect } from 'react';
import { Match, MatchStatus } from '@/types';
import { MatchdaySelector } from '@/components/matches/MatchdaySelector';
import { MatchCard } from '@/components/matches/MatchCard';
import { Radio, Filter, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MatchdayPage() {
  const [selectedMatchday, setSelectedMatchday] = useState<number>(10);
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'LIVE' | 'FINISHED' | 'SCHEDULED'>('ALL');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMatches() {
      setLoading(true);
      try {
        const res = await fetch(`/api/matches?matchday=${selectedMatchday}`);
        const data = await res.json();
        if (data.success) {
          setMatches(data.data);
        }
      } catch (err) {
        console.error('Error cargando partidos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [selectedMatchday]);

  // Filtrado por estado
  const filteredMatches = matches.filter((m) => {
    if (selectedStatus === 'ALL') return true;
    if (selectedStatus === 'LIVE') return m.status === 'LIVE' || m.status === 'HALFTIME';
    if (selectedStatus === 'FINISHED') return m.status === 'FINISHED';
    if (selectedStatus === 'SCHEDULED') return m.status === 'SCHEDULED';
    return true;
  });

  const liveCount = matches.filter((m) => m.status === 'LIVE' || m.status === 'HALFTIME').length;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner de Bienvenida y Estado del Torneo */}
      <div className="relative overflow-hidden rounded-3xl border border-card-border bg-gradient-to-r from-card via-[#122238] to-card p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-accent-gold border border-accent-gold/30">
                <Flame className="h-3.5 w-3.5 text-accent-gold" />
                Liga BetPlay Dimayor 2026
              </span>
              {liveCount > 0 && (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-accent-pitch border border-emerald-500/40 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-accent-pitch" />
                  {liveCount} {liveCount === 1 ? 'partido en vivo' : 'partidos en vivo'}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Centro de Partidos FPC
            </h1>
            <p className="mt-1 text-sm text-gray-300 max-w-2xl">
              Sigue la emoción de la primera división colombiana minuto a minuto con marcadores en directo, contexto de altitud y transmisión oficial.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-main/70 border border-card-border px-4 py-3 text-center shadow-lg">
              <span className="text-xs font-bold uppercase text-gray-400 block">Jornada Activa</span>
              <span className="text-2xl font-black text-accent-pitch">Fecha 10</span>
            </div>
          </div>
        </div>

        {/* Círculo decorativo difuso en el fondo */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-accent-pitch/10 blur-3xl pointer-events-none" />
      </div>

      {/* Selector de Jornada */}
      <MatchdaySelector
        currentMatchday={selectedMatchday}
        onSelectMatchday={setSelectedMatchday}
      />

      {/* Barra de Filtros por Estado */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-card/80 p-1.5 rounded-xl border border-card-border w-full sm:w-auto">
          <button
            onClick={() => setSelectedStatus('ALL')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all',
              selectedStatus === 'ALL'
                ? 'bg-accent-pitch text-slate-950 shadow-md'
                : 'text-gray-300 hover:text-white'
            )}
          >
            Todos ({matches.length})
          </button>
          <button
            onClick={() => setSelectedStatus('LIVE')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
              selectedStatus === 'LIVE'
                ? 'bg-accent-pitch text-slate-950 shadow-md'
                : 'text-gray-300 hover:text-white'
            )}
          >
            <span className="h-2 w-2 rounded-full bg-accent-pitch animate-pulse" />
            En Vivo ({liveCount})
          </button>
          <button
            onClick={() => setSelectedStatus('FINISHED')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all',
              selectedStatus === 'FINISHED'
                ? 'bg-accent-pitch text-slate-950 shadow-md'
                : 'text-gray-300 hover:text-white'
            )}
          >
            Finalizados
          </button>
          <button
            onClick={() => setSelectedStatus('SCHEDULED')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all',
              selectedStatus === 'SCHEDULED'
                ? 'bg-accent-pitch text-slate-950 shadow-md'
                : 'text-gray-300 hover:text-white'
            )}
          >
            Programados
          </button>
        </div>

        <span className="text-xs text-gray-400 font-semibold">
          Mostrando {filteredMatches.length} de {matches.length} partidos
        </span>
      </div>

      {/* Grid de Partidos */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl border border-card-border bg-card/40 animate-pulse"
            />
          ))}
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card p-12 text-center text-gray-400 space-y-2">
          <p className="text-base font-bold text-gray-200">
            No hay partidos con el filtro seleccionado
          </p>
          <p className="text-xs text-gray-500">
            Intenta seleccionar otra jornada o cambia a la vista de todos los partidos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </main>
  );
}
