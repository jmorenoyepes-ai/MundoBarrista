'use client';

// ============================================
// MundoBarrista — Contenedor de Pestañas Match Center
// 4 Pestañas: Resumen, Alineaciones, Estadísticas, Historial
// ============================================

import { useState } from 'react';
import { MatchDetail } from '@/types';
import { MatchTimeline } from '@/components/matches/MatchTimeline';
import { TacticalPitch } from '@/components/matches/TacticalPitch';
import { MatchStatsComparison } from '@/components/matches/MatchStatsComparison';
import { HeadToHeadView } from '@/components/matches/HeadToHeadView';
import { Clock, Shirt, BarChart3, History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MatchCenterTabsProps {
  detail: MatchDetail;
}

type TabType = 'resumen' | 'alineaciones' | 'estadisticas' | 'h2h';

export function MatchCenterTabs({ detail }: MatchCenterTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('resumen');

  const tabs = [
    { id: 'resumen', label: 'Resumen', icon: Clock },
    { id: 'alineaciones', label: 'Alineaciones', icon: Shirt },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
    { id: 'h2h', label: 'Historial (H2H)', icon: History },
  ];

  return (
    <div className="space-y-6">
      {/* Barra de Pestañas */}
      <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-card-border bg-card/80 p-2 shadow-lg scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-1 justify-center',
                isActive
                  ? 'bg-accent-pitch text-slate-950 shadow-md font-extrabold'
                  : 'text-gray-300 hover:text-white hover:bg-card-border/40'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-slate-950' : 'text-gray-400')} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido de la Pestaña Activa */}
      <div>
        {activeTab === 'resumen' && <MatchTimeline detail={detail} />}
        {activeTab === 'alineaciones' && <TacticalPitch detail={detail} />}
        {activeTab === 'estadisticas' && <MatchStatsComparison detail={detail} />}
        {activeTab === 'h2h' && <HeadToHeadView detail={detail} />}
      </div>
    </div>
  );
}
