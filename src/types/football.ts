// ============================================
// MundoBarrista — Definiciones de Tipos de Dominio
// Liga BetPlay Dimayor & FPC
// ============================================

export type MatchStatus =
  | 'SCHEDULED'
  | 'LIVE'
  | 'HALFTIME'
  | 'FINISHED'
  | 'POSTPONED'
  | 'CANCELLED';

export type MatchPhase =
  | 'TODOS_CONTRA_TODOS'
  | 'CUADRANGULARES'
  | 'FINAL';

export type EventType =
  | 'GOAL'
  | 'OWN_GOAL'
  | 'PENALTY_GOAL'
  | 'PENALTY_MISSED'
  | 'YELLOW_CARD'
  | 'RED_CARD'
  | 'SECOND_YELLOW'
  | 'SUBSTITUTION'
  | 'VAR_DECISION';

export interface Team {
  id: number;
  name: string;
  shortName: string;
  slug: string;
  city: string;
  stadium: string;
  stadiumCapacity?: number;
  altitude: number; // metros sobre el nivel del mar (msnm)
  founded?: number;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
}

export interface Match {
  id: number;
  season: number;
  phase: MatchPhase;
  matchday: number;
  dateTime: string; // ISO 8601 (hora Colombia)
  status: MatchStatus;
  minute?: number; // Minuto actual si está EN VIVO
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  stadium: string;
  city: string;
  altitude: number;
  tvChannel?: string; // "Win Sports+" | "Win Sports"
  referee?: string;
}

export interface MatchEvent {
  id: number;
  matchId: number;
  teamId: number;
  minute: number;
  extraMinute?: number;
  type: EventType;
  playerName: string;
  assistName?: string;
  detail?: string;
}

export interface LineupPlayer {
  id: number;
  name: string;
  number: number;
  position: 'G' | 'D' | 'M' | 'F'; // Portero, Defensa, Mediocampista, Delantero
  grid?: string; // Coordenadas en cancha, ej. "1:1", "2:3"
  isCaptain?: boolean;
}

export interface MatchLineup {
  teamId: number;
  formation: string; // ej. "4-2-3-1" o "4-3-3"
  coach: string;
  startingXI: LineupPlayer[];
  substitutes: LineupPlayer[];
}

export interface TeamStats {
  possession: number; // Porcentaje, ej. 54.5
  totalShots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  offsides: number;
  yellowCards: number;
  redCards: number;
  passes: number;
  passAccuracy: number; // Porcentaje, ej. 82.0
}

export interface MatchStats {
  home: TeamStats;
  away: TeamStats;
}

export interface H2HSummary {
  totalMatches: number;
  homeWins: number;
  awayWins: number;
  draws: number;
}

export interface HeadToHead {
  summary: H2HSummary;
  recentMatches: {
    id: number;
    date: string;
    homeTeamName: string;
    awayTeamName: string;
    homeScore: number;
    awayScore: number;
    stadium: string;
  }[];
  homeForm: ('W' | 'D' | 'L')[];
  awayForm: ('W' | 'D' | 'L')[];
}

export interface MatchDetail {
  match: Match;
  events: MatchEvent[];
  stats?: MatchStats;
  lineups?: {
    home: MatchLineup;
    away: MatchLineup;
  };
  headToHead?: HeadToHead;
}

export interface StandingItem {
  position: number;
  team: Team;
  played: number; // PJ
  won: number; // PG
  drawn: number; // PE
  lost: number; // PP
  goalsFor: number; // GF
  goalsAgainst: number; // GC
  goalDifference: number; // DG
  points: number; // PTS
  lastFive: ('W' | 'D' | 'L')[]; // Racha últimos 5 partidos
  isQualificationZone: boolean; // Puestos 1 al 8 (Cuadrangulares)
}

export type InternationalCup = 'LIBERTADORES' | 'SUDAMERICANA' | 'NONE';

export interface ReclassificationItem {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  internationalCup: InternationalCup;
}

export interface RelegationYearData {
  year: number;
  points: number;
  played: number;
}

export interface RelegationItem {
  position: number;
  team: Team;
  records: RelegationYearData[];
  totalPoints: number;
  totalPlayed: number;
  average: number; // totalPoints / totalPlayed
  isRelegationZone: boolean; // Últimos 2 puestos
}
