// ============================================
// MundoBarrista — Match Center: Línea de Tiempo
// Timeline vertical con goles, tarjetas, cambios y VAR
// ============================================

import { MatchDetail, MatchEvent } from '@/types';
import { ArrowRightLeft, Tv, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MatchTimelineProps {
  detail: MatchDetail;
}

export function MatchTimeline({ detail }: MatchTimelineProps) {
  const { match, events } = detail;

  if (!events || events.length === 0) {
    return (
      <div className="rounded-2xl border border-card-border bg-card p-8 text-center text-gray-400">
        <p className="font-semibold">No se han registrado eventos para este partido aún.</p>
        <p className="text-xs text-gray-500 mt-1">Los goles y eventos aparecerán aquí minuto a minuto.</p>
      </div>
    );
  }

  // Ordenar cronológicamente (minuto más reciente arriba o normal)
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <div className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 shadow-xl">
      <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-accent-pitch">⏱️</span>
        <span>Línea de Tiempo del Partido</span>
      </h3>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-700/80 space-y-6">
        {sortedEvents.map((event) => {
          const isHome = event.teamId === match.homeTeam.id;
          const team = isHome ? match.homeTeam : match.awayTeam;

          return (
            <div key={event.id} className="relative group">
              {/* Círculo indicador en la línea */}
              <div
                className={cn(
                  'absolute -left-[31px] sm:-left-[39px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-main shadow-md text-xs font-black transition-transform group-hover:scale-110',
                  event.type === 'GOAL'
                    ? 'bg-accent-pitch text-slate-950 ring-2 ring-emerald-500/40'
                    : event.type === 'YELLOW_CARD'
                    ? 'bg-accent-gold text-slate-950'
                    : event.type === 'RED_CARD'
                    ? 'bg-accent-danger text-white'
                    : event.type === 'VAR_DECISION'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-gray-200'
                )}
              >
                {event.minute}&apos;
              </div>

              {/* Contenido de la tarjeta del evento */}
              <div
                className={cn(
                  'rounded-xl border p-3 sm:p-4 transition-all duration-200',
                  isHome
                    ? 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/40'
                    : 'border-blue-500/20 bg-blue-950/10 hover:border-blue-500/40'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Icono según tipo */}
                    {event.type === 'GOAL' && <span className="text-lg">⚽</span>}
                    {event.type === 'YELLOW_CARD' && (
                      <span className="inline-block h-4 w-3 rounded-sm bg-accent-gold shadow" />
                    )}
                    {event.type === 'RED_CARD' && (
                      <span className="inline-block h-4 w-3 rounded-sm bg-accent-danger shadow" />
                    )}
                    {event.type === 'SUBSTITUTION' && (
                      <ArrowRightLeft className="h-4 w-4 text-emerald-400" />
                    )}
                    {event.type === 'VAR_DECISION' && (
                      <Tv className="h-4 w-4 text-purple-400" />
                    )}

                    <span className="font-extrabold text-sm sm:text-base text-white">
                      {event.playerName}
                    </span>

                    {event.type === 'GOAL' && (
                      <span className="rounded bg-accent-pitch/20 px-2 py-0.5 text-[10px] font-black uppercase text-accent-pitch border border-accent-pitch/40">
                        ¡GOL!
                      </span>
                    )}

                    {event.type === 'VAR_DECISION' && (
                      <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-black uppercase text-purple-300 border border-purple-500/40">
                        VAR
                      </span>
                    )}
                  </div>

                  {/* Nombre y color del club */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: team.primaryColor }}
                    />
                    <span>{team.shortName}</span>
                  </div>
                </div>

                {/* Asistencia o detalles */}
                {event.assistName && (
                  <p className="mt-1 text-xs text-gray-400">
                    Asistencia:{' '}
                    <span className="font-semibold text-gray-300">
                      {event.assistName}
                    </span>
                  </p>
                )}

                {event.detail && (
                  <p className="mt-1 text-xs text-gray-400 italic">
                    {event.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
