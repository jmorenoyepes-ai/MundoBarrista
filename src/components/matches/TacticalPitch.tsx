'use client';

// ============================================
// MundoBarrista — Match Center: Cancha Táctica
// Representación visual del campo de fútbol con formación 4-2-3-1
// ============================================

import { useState } from 'react';
import { MatchDetail } from '@/types';
import { cn } from '@/lib/utils';
import { UserCheck } from 'lucide-react';

interface TacticalPitchProps {
  detail: MatchDetail;
}

export function TacticalPitch({ detail }: TacticalPitchProps) {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  const { match, lineups } = detail;

  if (!lineups) {
    return (
      <div className="rounded-2xl border border-card-border bg-card p-8 text-center text-gray-400">
        <p className="font-semibold">Alineaciones no disponibles aún para este partido.</p>
        <p className="text-xs text-gray-500 mt-1">Se publican aproximadamente 1 hora antes del pitazo inicial.</p>
      </div>
    );
  }

  const currentLineup = selectedTeam === 'home' ? lineups.home : lineups.away;
  const currentTeam = selectedTeam === 'home' ? match.homeTeam : match.awayTeam;

  // Organizar jugadores de la alineación titular en filas según su posición (G, D, M, F)
  const goalkeepers = currentLineup.startingXI.filter((p) => p.position === 'G');
  const defenders = currentLineup.startingXI.filter((p) => p.position === 'D');
  const midfielders = currentLineup.startingXI.filter((p) => p.position === 'M');
  const forwards = currentLineup.startingXI.filter((p) => p.position === 'F');

  return (
    <div className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 shadow-xl space-y-6">
      {/* Selector de Equipo */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-card-border pb-4">
        <div className="flex items-center gap-2 bg-main p-1 rounded-xl border border-card-border">
          <button
            onClick={() => setSelectedTeam('home')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
              selectedTeam === 'home'
                ? 'bg-accent-pitch text-slate-950 shadow-md'
                : 'text-gray-300 hover:text-white'
            )}
          >
            <span
              className="h-2.5 w-2.5 rounded-full border border-white/20"
              style={{ backgroundColor: match.homeTeam.primaryColor }}
            />
            <span>{match.homeTeam.name}</span>
          </button>
          <button
            onClick={() => setSelectedTeam('away')}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
              selectedTeam === 'away'
                ? 'bg-accent-pitch text-slate-950 shadow-md'
                : 'text-gray-300 hover:text-white'
            )}
          >
            <span
              className="h-2.5 w-2.5 rounded-full border border-white/20"
              style={{ backgroundColor: match.awayTeam.primaryColor }}
            />
            <span>{match.awayTeam.name}</span>
          </button>
        </div>

        {/* Formación y DT */}
        <div className="flex items-center gap-4 text-xs">
          <div className="rounded-lg bg-slate-800/80 px-3 py-1.5 border border-slate-700 font-bold text-accent-gold">
            Táctica: {currentLineup.formation}
          </div>
          <div className="text-gray-300">
            DT: <strong className="text-white font-semibold">{currentLineup.coach}</strong>
          </div>
        </div>
      </div>

      {/* Cancha de Fútbol Visual */}
      <div className="relative mx-auto w-full max-w-2xl rounded-2xl border-2 border-emerald-600/40 bg-gradient-to-b from-[#0e3b26] to-[#072417] p-6 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
        {/* Líneas de Cancha (Césped y tiza blanca) */}
        <div className="absolute inset-x-8 top-0 h-16 border-b border-x border-white/20 rounded-b-xl pointer-events-none" />
        <div className="absolute inset-x-20 top-0 h-8 border-b border-x border-white/20 rounded-b-lg pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/25 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full border border-white/25 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/40 pointer-events-none" />
        <div className="absolute inset-x-8 bottom-0 h-16 border-t border-x border-white/20 rounded-t-xl pointer-events-none" />
        <div className="absolute inset-x-20 bottom-0 h-8 border-t border-x border-white/20 rounded-t-lg pointer-events-none" />

        {/* Fila Delanteros */}
        <div className="relative z-10 flex justify-around items-center pt-2">
          {forwards.map((player) => (
            <PlayerNode key={player.id} player={player} teamColor={currentTeam.primaryColor} />
          ))}
        </div>

        {/* Fila Mediocampistas */}
        <div className="relative z-10 flex justify-around items-center py-2">
          {midfielders.map((player) => (
            <PlayerNode key={player.id} player={player} teamColor={currentTeam.primaryColor} />
          ))}
        </div>

        {/* Fila Defensas */}
        <div className="relative z-10 flex justify-around items-center py-2">
          {defenders.map((player) => (
            <PlayerNode key={player.id} player={player} teamColor={currentTeam.primaryColor} />
          ))}
        </div>

        {/* Portero */}
        <div className="relative z-10 flex justify-center items-center pb-2">
          {goalkeepers.map((player) => (
            <PlayerNode key={player.id} player={player} teamColor="#FACC15" isGoalkeeper />
          ))}
        </div>
      </div>

      {/* Lista de Suplentes / Banquillo */}
      <div className="rounded-xl border border-card-border bg-main/50 p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
          <UserCheck className="h-3.5 w-3.5 text-accent-gold" />
          <span>Banquillo de Suplentes</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {currentLineup.substitutes.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-2.5 rounded-lg bg-card/60 px-3 py-1.5 border border-card-border/60 text-xs"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 font-black text-[10px] text-gray-300">
                {sub.number}
              </span>
              <span className="font-semibold text-gray-200 truncate">{sub.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayerNode({
  player,
  teamColor,
  isGoalkeeper = false,
}: {
  player: { id: number; name: string; number: number; isCaptain?: boolean };
  teamColor: string;
  isGoalkeeper?: boolean;
}) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div
        className={cn(
          'flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-black text-xs sm:text-sm text-white shadow-lg border-2 border-white/60 transition-transform group-hover:scale-110 relative',
          isGoalkeeper && 'text-slate-950 font-black'
        )}
        style={{ backgroundColor: teamColor }}
      >
        <span>{player.number}</span>
        {player.isCaptain && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-gold text-[9px] font-black text-slate-950 shadow">
            C
          </span>
        )}
      </div>
      <span className="mt-1 max-w-[80px] truncate rounded bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-bold text-gray-200 text-center shadow">
        {player.name.split(' ').pop()}
      </span>
    </div>
  );
}
