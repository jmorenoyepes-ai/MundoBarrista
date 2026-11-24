// ============================================
// MundoBarrista — Match Center: Historial H2H
// Historial directo y racha de los últimos 5 partidos
// ============================================

import { MatchDetail } from '@/types';
import { cn } from '@/lib/utils';
import { Trophy, Calendar } from 'lucide-react';

interface HeadToHeadViewProps {
  detail: MatchDetail;
}

export function HeadToHeadView({ detail }: HeadToHeadViewProps) {
  const { match, headToHead } = detail;

  if (!headToHead) {
    return (
      <div className="rounded-2xl border border-card-border bg-card p-8 text-center text-gray-400">
        <p className="font-semibold">Historial directo no disponible.</p>
      </div>
    );
  }

  const { summary, recentMatches, homeForm, awayForm } = headToHead;

  return (
    <div className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 shadow-xl space-y-6">
      {/* Resumen de Enfrentamientos Directos */}
      <div>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent-gold" />
          <span>Historial General de Enfrentamientos</span>
        </h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
            <span className="text-2xl font-black text-emerald-400">{summary.homeWins}</span>
            <p className="text-[11px] font-bold text-gray-300 mt-0.5 truncate">
              {match.homeTeam.shortName}
            </p>
          </div>
          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
            <span className="text-2xl font-black text-gray-300">{summary.draws}</span>
            <p className="text-[11px] font-bold text-gray-400 mt-0.5">Empates</p>
          </div>
          <div className="rounded-xl bg-slate-800/80 p-3 border border-slate-700/60">
            <span className="text-2xl font-black text-blue-400">{summary.awayWins}</span>
            <p className="text-[11px] font-bold text-gray-300 mt-0.5 truncate">
              {match.awayTeam.shortName}
            </p>
          </div>
        </div>
      </div>

      {/* Rachas de los últimos 5 partidos */}
      <div className="border-t border-card-border pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Racha de los Últimos 5 Partidos
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Racha Local */}
          <div className="flex items-center justify-between rounded-xl bg-main/50 p-3 border border-card-border/60">
            <span className="font-bold text-sm text-white">{match.homeTeam.name}</span>
            <div className="flex gap-1.5">
              {homeForm.map((result, idx) => (
                <FormBadge key={idx} result={result} />
              ))}
            </div>
          </div>

          {/* Racha Visitante */}
          <div className="flex items-center justify-between rounded-xl bg-main/50 p-3 border border-card-border/60">
            <span className="font-bold text-sm text-white">{match.awayTeam.name}</span>
            <div className="flex gap-1.5">
              {awayForm.map((result, idx) => (
                <FormBadge key={idx} result={result} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Últimos Enfrentamientos Directos */}
      {recentMatches && recentMatches.length > 0 && (
        <div className="border-t border-card-border pt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent-gold" />
            <span>Últimos Enfrentamientos Directos</span>
          </h4>
          <div className="space-y-2">
            {recentMatches.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl bg-main/40 px-4 py-2.5 border border-card-border/60 text-xs"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-white">
                    {m.homeTeamName} vs {m.awayTeamName}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {m.date} • {m.stadium}
                  </span>
                </div>
                <div className="rounded-lg bg-slate-800 px-3 py-1 font-black text-sm text-accent-gold border border-slate-700">
                  {m.homeScore} - {m.awayScore}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FormBadge({ result }: { result: 'W' | 'D' | 'L' }) {
  return (
    <span
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-md font-black text-[11px] text-white shadow',
        result === 'W' && 'bg-accent-pitch text-slate-950',
        result === 'D' && 'bg-slate-600',
        result === 'L' && 'bg-accent-danger'
      )}
    >
      {result}
    </span>
  );
}
