'use client';

// ============================================
// MundoBarrista — Selector de Jornadas
// Desplazamiento horizontal para Fechas 1 a 19 y fases finales
// ============================================

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface MatchdaySelectorProps {
  currentMatchday: number;
  onSelectMatchday: (matchday: number) => void;
}

export function MatchdaySelector({
  currentMatchday,
  onSelectMatchday,
}: MatchdaySelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const matchdays = Array.from({ length: 19 }, (_, i) => i + 1);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-card/60 rounded-2xl border border-card-border p-3 shadow-lg">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
            Fase Regular — Todos contra Todos
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-pitch/10 px-2 py-0.5 text-[11px] font-bold text-accent-pitch border border-accent-pitch/20">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-pitch animate-pulse" />
            Fecha 10 Activa
          </span>
        </div>

        {/* Scroll Arrows */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => handleScroll('left')}
            className="p-1 rounded-lg hover:bg-card-border/60 text-gray-400 hover:text-white transition-colors"
            aria-label="Jornada anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-1 rounded-lg hover:bg-card-border/60 text-gray-400 hover:text-white transition-colors"
            aria-label="Jornada siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Matchdays Horizontal Pill Scroll */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 scroll-smooth"
      >
        {matchdays.map((num) => {
          const isSelected = currentMatchday === num;
          const isLiveFecha = num === 10;

          return (
            <button
              key={num}
              onClick={() => onSelectMatchday(num)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5',
                isSelected
                  ? 'bg-accent-pitch text-slate-950 shadow-lg shadow-emerald-950/50 scale-105'
                  : 'bg-card border border-card-border text-gray-300 hover:border-accent-pitch/40 hover:text-white'
              )}
            >
              <span>Fecha {num}</span>
              {isLiveFecha && (
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    isSelected ? 'bg-slate-950' : 'bg-accent-pitch animate-ping'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
