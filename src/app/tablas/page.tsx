import Link from 'next/link';
import { footballService } from '@/lib/football-service';
import { Trophy, ShieldAlert, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function TablasPage() {
  const standings = await footballService.getStandings();
  const relegation = await footballService.getRelegation();
  const reclassification = await footballService.getReclassification();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Cabecera */}
      <div className="relative overflow-hidden rounded-3xl border border-card-border bg-gradient-to-r from-card via-[#122238] to-card p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="flex items-center gap-1.5 rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-accent-gold border border-accent-gold/30 w-fit mb-2">
              <Trophy className="h-3.5 w-3.5" />
              Tablas Oficiales FPC
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Centro de Tablas — Liga BetPlay
            </h1>
            <p className="mt-1 text-sm text-gray-300 max-w-2xl">
              Clasificación a Cuadrangulares (puestos 1 al 8), Reclasificación anual para copas internacionales y Tabla del Descenso por promedio.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-card border border-card-border px-4 py-2.5 text-xs font-bold text-gray-200 hover:text-white hover:border-accent-pitch/60 transition-all w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Partidos</span>
          </Link>
        </div>
      </div>

      {/* Tabla 1: Todos contra Todos */}
      <div className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="text-accent-pitch">⚽</span>
            <span>Tabla de Posiciones (Todos contra Todos)</span>
          </h2>
          <span className="text-xs font-bold text-accent-pitch bg-accent-pitch/10 px-2.5 py-1 rounded-full border border-accent-pitch/20">
            Puestos 1 al 8 a Cuadrangulares
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-card-border text-gray-400 font-bold uppercase text-[11px]">
                <th className="py-3 px-2">Pos</th>
                <th className="py-3 px-3">Equipo</th>
                <th className="py-3 px-2 text-center">PJ</th>
                <th className="py-3 px-2 text-center">PG</th>
                <th className="py-3 px-2 text-center">PE</th>
                <th className="py-3 px-2 text-center">PP</th>
                <th className="py-3 px-2 text-center">GF</th>
                <th className="py-3 px-2 text-center">GC</th>
                <th className="py-3 px-2 text-center">DG</th>
                <th className="py-3 px-3 text-center text-accent-gold">PTS</th>
                <th className="py-3 px-3 text-center">Últimos 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/60">
              {standings.map((row) => (
                <tr
                  key={row.position}
                  className={cn(
                    'hover:bg-slate-800/40 transition-colors',
                    row.isQualificationZone && 'bg-emerald-950/10'
                  )}
                >
                  <td className="py-3 px-2 font-black">
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-md text-[11px]',
                        row.isQualificationZone
                          ? 'bg-accent-pitch text-slate-950 font-black'
                          : 'text-gray-400'
                      )}
                    >
                      {row.position}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: row.team.primaryColor }}
                    />
                    <span className="truncate">{row.team.name}</span>
                  </td>
                  <td className="py-3 px-2 text-center text-gray-300 font-semibold">{row.played}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{row.won}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{row.drawn}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{row.lost}</td>
                  <td className="py-3 px-2 text-center text-gray-400">{row.goalsFor}</td>
                  <td className="py-3 px-2 text-center text-gray-400">{row.goalsAgainst}</td>
                  <td className="py-3 px-2 text-center font-bold text-gray-200">
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </td>
                  <td className="py-3 px-3 text-center text-sm font-black text-accent-gold">
                    {row.points}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex justify-center gap-1">
                      {row.lastFive.map((res, i) => (
                        <span
                          key={i}
                          className={cn(
                            'h-4 w-4 rounded-sm flex items-center justify-center text-[9px] font-black',
                            res === 'W' && 'bg-accent-pitch text-slate-950',
                            res === 'D' && 'bg-slate-600 text-white',
                            res === 'L' && 'bg-accent-danger text-white'
                          )}
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Reclasificación y Descenso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabla de Reclasificación */}
        <div className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent-gold" />
              <span>Tabla de Reclasificación (Acumulado)</span>
            </h3>
            <span className="text-[11px] font-bold text-blue-400">Cupos Conmebol</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-card-border text-gray-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-2">Pos</th>
                  <th className="py-2.5 px-3">Equipo</th>
                  <th className="py-2.5 px-2 text-center">PJ</th>
                  <th className="py-2.5 px-2 text-center">DG</th>
                  <th className="py-2.5 px-3 text-center text-accent-gold">PTS</th>
                  <th className="py-2.5 px-2 text-center">Torneo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border/60">
                {reclassification.slice(0, 10).map((row) => (
                  <tr key={row.position} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-2 font-bold text-gray-400">{row.position}</td>
                    <td className="py-2.5 px-3 font-semibold text-white">{row.team.name}</td>
                    <td className="py-2.5 px-2 text-center text-gray-300">{row.played}</td>
                    <td className="py-2.5 px-2 text-center text-gray-300">{row.goalDifference}</td>
                    <td className="py-2.5 px-3 text-center font-black text-accent-gold">{row.points}</td>
                    <td className="py-2.5 px-2 text-center">
                      {row.internationalCup === 'LIBERTADORES' && (
                        <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[9px] font-extrabold text-blue-300 border border-blue-500/30">
                          Libertadores
                        </span>
                      )}
                      {row.internationalCup === 'SUDAMERICANA' && (
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] font-extrabold text-emerald-300 border border-emerald-500/30">
                          Sudamericana
                        </span>
                      )}
                      {row.internationalCup === 'NONE' && (
                        <span className="text-gray-600 text-[10px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla del Descenso */}
        <div className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-accent-danger" />
              <span>Tabla del Descenso (Promedio 3 Años)</span>
            </h3>
            <span className="text-[11px] font-bold text-accent-danger bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
              Últimos 2 descienden
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-card-border text-gray-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-2">Pos</th>
                  <th className="py-2.5 px-3">Equipo</th>
                  <th className="py-2.5 px-2 text-center">PTS Total</th>
                  <th className="py-2.5 px-2 text-center">PJ Total</th>
                  <th className="py-2.5 px-3 text-center text-accent-danger">Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border/60">
                {relegation.slice(relegation.length - 8).map((row) => (
                  <tr
                    key={row.position}
                    className={cn(
                      'hover:bg-slate-800/40',
                      row.isRelegationZone && 'bg-red-950/20 font-bold'
                    )}
                  >
                    <td className="py-2.5 px-2 font-bold">
                      <span
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded text-[10px]',
                          row.isRelegationZone
                            ? 'bg-accent-danger text-white font-black'
                            : 'text-gray-400'
                        )}
                      >
                        {row.position}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-white">
                      <div className="flex items-center gap-1.5">
                        <span>{row.team.name}</span>
                        {row.isRelegationZone && (
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-accent-danger/20 text-accent-danger font-extrabold border border-accent-danger/40">
                            Zona Descenso
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center text-gray-300">{row.totalPoints}</td>
                    <td className="py-2.5 px-2 text-center text-gray-300">{row.totalPlayed}</td>
                    <td className="py-2.5 px-3 text-center font-black text-sm text-accent-danger">
                      {row.average.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
