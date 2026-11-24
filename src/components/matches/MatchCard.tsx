// ============================================
// MundoBarrista — Tarjeta de Partido
// Contexto Geográfico Colombiano (Estadio, Ciudad, Altitud msnm)
// + Canal de TV oficial + Estados EN VIVO, FINAL, PROGRAMADO
// ============================================

import Link from 'next/link';
import { Match } from '@/types';
import { Mountain, MapPin, Tv, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match}: MatchCardProps) {
  const isLive = match.status === 'LIVE' || match.status === 'HALFTIME';
  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED';

  // Formato de hora Colombia
  const matchTime = new Date(match.dateTime).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300',
        isLive
          ? 'border-emerald-500/40 bg-gradient-to-b from-card to-emerald-950/10 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
          : 'border-card-border bg-card/80 hover:border-slate-600 hover:shadow-xl'
      )}
    >
      {/* Barra superior: Contexto Geográfico Colombiano y TV */}
      <div className="flex items-center justify-between border-b border-card-border/60 bg-main/40 px-4 py-2.5 text-[11px] text-gray-400">
        <div className="flex items-center gap-2 truncate">
          <span className="flex items-center gap-1 truncate font-medium text-gray-300">
            <MapPin className="h-3 w-3 text-accent-gold flex-shrink-0" />
            <span className="truncate">{match.stadium}</span>
            <span className="text-gray-500">•</span>
            <span>{match.city}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-0.5 rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-emerald-400 font-semibold border border-emerald-900/40">
            <Mountain className="h-2.5 w-2.5" />
            {match.altitude} msnm
          </span>
        </div>

        {/* Canal de Transmisión */}
        {match.tvChannel && (
          <div className="flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-bold text-gray-200 border border-slate-700/60 flex-shrink-0">
            <Tv className="h-2.5 w-2.5 text-accent-gold" />
            <span>{match.tvChannel}</span>
          </div>
        )}
      </div>

      {/* Contenido Principal: Equipos y Marcador */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Equipo Local */}
          <div className="flex items-center gap-3 justify-end text-right">
            <div>
              <p className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-accent-pitch transition-colors">
                {match.homeTeam.name}
              </p>
              <p className="text-[11px] font-semibold text-gray-400">
                {match.homeTeam.shortName}
              </p>
            </div>
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-black text-sm text-white shadow-md border border-white/10"
              style={{ backgroundColor: match.homeTeam.primaryColor }}
            >
              {match.homeTeam.shortName}
            </div>
          </div>

          {/* Marcador / Estado Central */}
          <div className="flex flex-col items-center justify-center min-w-[90px] px-2">
            {isLive ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-black text-accent-pitch border border-emerald-500/40 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-accent-pitch" />
                  <span>{match.minute}&apos; EN VIVO</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-2xl sm:text-3xl font-black text-white tracking-wider">
                  <span>{match.homeScore}</span>
                  <span className="text-gray-600">-</span>
                  <span>{match.awayScore}</span>
                </div>
              </div>
            ) : isFinished ? (
              <div className="flex flex-col items-center">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Final
                </span>
                <div className="mt-1 flex items-center gap-2 text-2xl sm:text-3xl font-black text-gray-200 tracking-wider">
                  <span>{match.homeScore}</span>
                  <span className="text-gray-600">-</span>
                  <span>{match.awayScore}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <span className="rounded-full bg-slate-800/90 px-2.5 py-0.5 text-[11px] font-semibold text-gray-300 border border-slate-700/60">
                  {matchTime}
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-accent-gold">
                  Programado
                </span>
              </div>
            )}
          </div>

          {/* Equipo Visitante */}
          <div className="flex items-center gap-3 justify-start text-left">
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-black text-sm text-white shadow-md border border-white/10"
              style={{ backgroundColor: match.awayTeam.primaryColor }}
            >
              {match.awayTeam.shortName}
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-accent-pitch transition-colors">
                {match.awayTeam.name}
              </p>
              <p className="text-[11px] font-semibold text-gray-400">
                {match.awayTeam.shortName}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de acceso al Match Center */}
        <div className="mt-4 pt-3 border-t border-card-border/60 flex items-center justify-between text-xs">
          <div className="text-[11px] text-gray-400">
            {match.referee && (
              <span>Árbitro: <strong className="text-gray-300 font-medium">{match.referee}</strong></span>
            )}
          </div>
          <Link
            href={`/partido/${match.id}`}
            className="flex items-center gap-1 font-bold text-accent-pitch hover:text-emerald-400 transition-colors group/link"
          >
            <span>Ver Match Center</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
