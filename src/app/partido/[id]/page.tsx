// ============================================
// MundoBarrista — Vista Detallada: Match Center (/partido/[id])
// Server Component con carga directa y SEO optimizado
// ============================================

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { footballService } from '@/lib/football-service';
import { MatchCenterTabs } from '@/components/matches/MatchCenterTabs';
import { ArrowLeft, MapPin, Mountain, Tv, UserCheck, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface MatchPageProps {
  params: {
    id: string;
  };
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const matchId = parseInt(params.id, 10);
  if (isNaN(matchId)) {
    notFound();
  }

  const detail = await footballService.getMatchById(matchId);
  if (!detail) {
    notFound();
  }

  const { match } = detail;
  const isLive = match.status === 'LIVE' || match.status === 'HALFTIME';
  const isFinished = match.status === 'FINISHED';

  const matchDate = new Date(match.dateTime).toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const matchTime = new Date(match.dateTime).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Botón Volver */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-card border border-card-border px-4 py-2 text-xs font-bold text-gray-300 hover:text-white hover:border-accent-pitch/50 transition-all shadow-md group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al Centro de Partidos</span>
        </Link>
      </div>

      {/* Hero Header del Partido */}
      <div className="relative overflow-hidden rounded-3xl border border-card-border bg-gradient-to-b from-card via-[#111e33] to-card p-6 sm:p-8 shadow-2xl">
        {/* Cabecera Contexto Geográfico Colombiano */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-card-border/80 pb-4 text-xs text-gray-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 font-semibold text-gray-200">
              <MapPin className="h-3.5 w-3.5 text-accent-gold" />
              <span>{match.stadium}</span>
              <span className="text-gray-500">•</span>
              <span>{match.city}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-950/60 px-2 py-0.5 text-xs text-emerald-400 font-bold border border-emerald-900/50">
              <Mountain className="h-3 w-3" />
              {match.altitude} msnm
            </span>
          </div>

          <div className="flex items-center gap-3">
            {match.tvChannel && (
              <span className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-bold text-accent-gold border border-slate-700">
                <Tv className="h-3.5 w-3.5" />
                <span>{match.tvChannel}</span>
              </span>
            )}
            <span className="capitalize text-gray-400">
              {matchDate} • {matchTime}
            </span>
          </div>
        </div>

        {/* Marcador Principal */}
        <div className="py-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            {/* Equipo Local */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-end gap-4 text-center sm:text-right">
              <div className="order-2 sm:order-1">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {match.homeTeam.name}
                </h2>
                <p className="text-xs font-bold text-gray-400">Local</p>
              </div>
              <div
                className="order-1 sm:order-2 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl font-black text-xl sm:text-2xl text-white shadow-xl border-2 border-white/20"
                style={{ backgroundColor: match.homeTeam.primaryColor }}
              >
                {match.homeTeam.shortName}
              </div>
            </div>

            {/* Marcador Central */}
            <div className="flex flex-col items-center justify-center px-4">
              {isLive ? (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black uppercase text-accent-pitch border border-emerald-500/40 animate-pulse">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-pitch" />
                    <span>{match.minute}&apos; EN VIVO</span>
                  </div>
                  <div className="mt-2 text-4xl sm:text-6xl font-black text-white tracking-widest flex items-center gap-4">
                    <span>{match.homeScore}</span>
                    <span className="text-gray-600">:</span>
                    <span>{match.awayScore}</span>
                  </div>
                </div>
              ) : isFinished ? (
                <div className="flex flex-col items-center">
                  <span className="rounded bg-slate-800 px-3 py-1 text-xs font-bold uppercase text-gray-300">
                    Finalizado
                  </span>
                  <div className="mt-2 text-4xl sm:text-6xl font-black text-gray-200 tracking-widest flex items-center gap-4">
                    <span>{match.homeScore}</span>
                    <span className="text-gray-600">:</span>
                    <span>{match.awayScore}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold uppercase text-accent-gold border border-slate-700">
                    Por Jugar
                  </span>
                  <div className="mt-2 text-2xl sm:text-4xl font-black text-gray-400">
                    {matchTime}
                  </div>
                </div>
              )}
            </div>

            {/* Equipo Visitante */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-start gap-4 text-center sm:text-left">
              <div
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl font-black text-xl sm:text-2xl text-white shadow-xl border-2 border-white/20"
                style={{ backgroundColor: match.awayTeam.primaryColor }}
              >
                {match.awayTeam.shortName}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {match.awayTeam.name}
                </h2>
                <p className="text-xs font-bold text-gray-400">Visitante</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer del Header con Árbitro y Fase */}
        <div className="border-t border-card-border/80 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-800/80 px-2.5 py-1 text-[11px] font-bold text-gray-300 border border-slate-700">
              Fecha {match.matchday} • Fase Regular
            </span>
          </div>
          {match.referee && (
            <div className="flex items-center gap-1.5 text-gray-300">
              <UserCheck className="h-3.5 w-3.5 text-accent-gold" />
              <span>Árbitro Principal: <strong className="text-white">{match.referee}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Match Center: 4 Pestañas Interactivas */}
      <MatchCenterTabs detail={detail} />
    </main>
  );
}
