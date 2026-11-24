// ============================================
// MundoBarrista — Interfaz del Servicio de Fútbol
// Patrón Adaptador para Proveedores de Datos
// ============================================

import {
  Match,
  MatchDetail,
  MatchPhase,
  MatchStatus,
  ReclassificationItem,
  RelegationItem,
  StandingItem,
  Team,
} from '@/types';

export interface MatchQueryOptions {
  matchday?: number;
  status?: MatchStatus;
  phase?: MatchPhase;
  season?: number;
}

export interface IFootballDataService {
  /**
   * Obtiene la lista de partidos con filtros opcionales (jornada, estado, fase)
   */
  getMatches(options?: MatchQueryOptions): Promise<Match[]>;

  /**
   * Obtiene el detalle completo de un partido (eventos, alineaciones, estadísticas, H2H)
   */
  getMatchById(id: number): Promise<MatchDetail | null>;

  /**
   * Obtiene la tabla de posiciones de la fase regular (Todos contra Todos)
   */
  getStandings(season?: number, semester?: number): Promise<StandingItem[]>;

  /**
   * Obtiene la tabla de reclasificación anual (cupos a Libertadores y Sudamericana)
   */
  getReclassification(year?: number): Promise<ReclassificationItem[]>;

  /**
   * Obtiene la tabla del descenso por promedio de los últimos 3 años
   */
  getRelegation(): Promise<RelegationItem[]>;

  /**
   * Obtiene el catálogo de los 20 equipos del FPC
   */
  getTeams(): Promise<Team[]>;

  /**
   * Obtiene un equipo por su ID
   */
  getTeamById(id: number): Promise<Team | null>;

  /**
   * Obtiene un equipo por su Slug (ej. "atletico-nacional")
   */
  getTeamBySlug(slug: string): Promise<Team | null>;
}
