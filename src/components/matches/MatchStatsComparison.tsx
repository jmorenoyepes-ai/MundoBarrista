// ============================================
// MundoBarrista — Match Center: Estadísticas Comparativas
// Barras comparativas de posesión, tiros, pases, etc.
// ============================================

import { MatchDetail } from '@/types';

interface MatchStatsComparisonProps {
  detail: MatchDetail;
}

export function MatchStatsComparison({ detail }: MatchStatsComparisonProps) {
  const { match, stats } = detail;

  if (!stats) {
    return (
      <div className="rounded-2xl border border-card-border bg-card p-8 text-center text-gray-400">
        <p className="font-semibold">Estadísticas en vivo aún no disponibles.</p>
        <p className="text-xs text-gray-500 mt-1">Se sincronizan automáticamente conforme avanza el juego.</p>
      </div>
    );
  }

  const statItems = [
    { label: 'Posesión de Balón', homeVal: `${stats.home.possession}%`, awayVal: `${stats.away.possession}%`, homeNum: stats.home.possession, awayNum: stats.away.possession },
    { label: 'Tiros Totales', homeVal: stats.home.totalShots, awayVal: stats.away.totalShots, homeNum: stats.home.totalShots, awayNum: stats.away.totalShots },
    { label: 'Tiros al Arco', homeVal: stats.home.shotsOnTarget, awayVal: stats.away.shotsOnTarget, homeNum: stats.home.shotsOnTarget, awayNum: stats.away.shotsOnTarget },
    { label: 'Tiros de Esquina', homeVal: stats.home.corners, awayVal: stats.away.corners, homeNum: stats.home.corners, awayNum: stats.away.corners },
    { label: 'Faltas Cometidas', homeVal: stats.home.fouls, awayVal: stats.away.fouls, homeNum: stats.home.fouls, awayNum: stats.away.fouls },
    { label: 'Fueras de Juego', homeVal: stats.home.offsides, awayVal: stats.away.offsides, homeNum: stats.home.offsides, awayNum: stats.away.offsides },
    { label: 'Pases Totales', homeVal: stats.home.passes, awayVal: stats.away.passes, homeNum: stats.home.passes, awayNum: stats.away.passes },
    { label: 'Precisión de Pases', homeVal: `${stats.home.passAccuracy}%`, awayVal: `${stats.away.passAccuracy}%`, homeNum: stats.home.passAccuracy, awayNum: stats.away.passAccuracy },
    { label: 'Tarjetas Amarillas', homeVal: stats.home.yellowCards, awayVal: stats.away.yellowCards, homeNum: stats.home.yellowCards, awayNum: stats.away.yellowCards },
    { label: 'Tarjetas Rojas', homeVal: stats.home.redCards, awayVal: stats.away.redCards, homeNum: stats.home.redCards, awayNum: stats.away.redCards },
  ];

  return (
    <div className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-card-border pb-4">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: match.homeTeam.primaryColor }}
          />
          <span className="font-extrabold text-sm sm:text-base text-white">
            {match.homeTeam.name}
          </span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Estadísticas
        </span>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm sm:text-base text-white">
            {match.awayTeam.name}
          </span>
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: match.awayTeam.primaryColor }}
          />
        </div>
      </div>

      <div className="space-y-5">
        {statItems.map((item) => {
          const total = item.homeNum + item.awayNum;
          const homePct = total > 0 ? (item.homeNum / total) * 100 : 50;
          const awayPct = 100 - homePct;

          return (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-sm font-black text-white">{item.homeVal}</span>
                <span className="text-gray-400 text-[11px] uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-black text-white">{item.awayVal}</span>
              </div>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="transition-all duration-500 rounded-l-full"
                  style={{
                    width: `${homePct}%`,
                    backgroundColor: match.homeTeam.primaryColor || '#10B981',
                  }}
                />
                <div
                  className="transition-all duration-500 rounded-r-full"
                  style={{
                    width: `${awayPct}%`,
                    backgroundColor: match.awayTeam.primaryColor || '#3B82F6',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
