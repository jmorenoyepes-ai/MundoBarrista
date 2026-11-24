// ============================================
// MundoBarrista — Mock Provider
// Proveedor local de datos estructurados de la Liga BetPlay
// ============================================

import {
  Match,
  MatchDetail,
  ReclassificationItem,
  RelegationItem,
  StandingItem,
  Team,
} from '@/types';
import {
  ALL_MOCK_MATCHES,
  MOCK_MATCH_DETAIL_NACIONAL_MILLOS,
  MOCK_RECLASSIFICATION,
  MOCK_RELEGATION,
  MOCK_STANDINGS,
  MOCK_TEAMS,
  TEAMS_BY_ID,
  TEAMS_BY_SLUG,
} from '@/mocks/betplay-data';
import { IFootballDataService, MatchQueryOptions } from './types';

export class MockFootballProvider implements IFootballDataService {
  async getMatches(options?: MatchQueryOptions): Promise<Match[]> {
    let result = [...ALL_MOCK_MATCHES];

    if (options?.matchday !== undefined) {
      result = result.filter((m) => m.matchday === options.matchday);
    }

    if (options?.status) {
      result = result.filter((m) => m.status === options.status);
    }

    if (options?.phase) {
      result = result.filter((m) => m.phase === options.phase);
    }

    if (options?.season) {
      result = result.filter((m) => m.season === options.season);
    }

    return result;
  }

  async getMatchById(id: number): Promise<MatchDetail | null> {
    // Si es el partido estrella Nacional vs Millonarios
    if (id === 101) {
      return MOCK_MATCH_DETAIL_NACIONAL_MILLOS;
    }

    // Para cualquier otro partido, buscar el match base y construir un detalle sintético realista
    const baseMatch = ALL_MOCK_MATCHES.find((m) => m.id === id);
    if (!baseMatch) {
      return null;
    }

    // Retorna estructura completa adaptada a los equipos del partido
    return {
      match: baseMatch,
      events: [
        {
          id: 1,
          matchId: baseMatch.id,
          teamId: baseMatch.homeTeam.id,
          minute: 24,
          type: 'GOAL',
          playerName: 'Goleador Local',
          detail: 'Remate potente al primer palo',
        },
        {
          id: 2,
          matchId: baseMatch.id,
          teamId: baseMatch.awayTeam.id,
          minute: 68,
          type: 'YELLOW_CARD',
          playerName: 'Defensa Visitante',
          detail: 'Falta táctica',
        },
      ],
      stats: {
        home: {
          possession: 52.0,
          totalShots: 11,
          shotsOnTarget: 4,
          corners: 4,
          fouls: 12,
          offsides: 1,
          yellowCards: 2,
          redCards: 0,
          passes: 380,
          passAccuracy: 81.0,
        },
        away: {
          possession: 48.0,
          totalShots: 8,
          shotsOnTarget: 3,
          corners: 3,
          fouls: 15,
          offsides: 2,
          yellowCards: 1,
          redCards: 0,
          passes: 350,
          passAccuracy: 79.0,
        },
      },
      headToHead: {
        summary: {
          totalMatches: 20,
          homeWins: 8,
          awayWins: 6,
          draws: 6,
        },
        recentMatches: [],
        homeForm: ['W', 'D', 'W', 'L', 'W'],
        awayForm: ['D', 'W', 'L', 'D', 'W'],
      },
    };
  }

  async getStandings(
    _season?: number,
    _semester?: number
  ): Promise<StandingItem[]> {
    return MOCK_STANDINGS;
  }

  async getReclassification(_year?: number): Promise<ReclassificationItem[]> {
    return MOCK_RECLASSIFICATION;
  }

  async getRelegation(): Promise<RelegationItem[]> {
    return MOCK_RELEGATION;
  }

  async getTeams(): Promise<Team[]> {
    return MOCK_TEAMS;
  }

  async getTeamById(id: number): Promise<Team | null> {
    return TEAMS_BY_ID.get(id) || null;
  }

  async getTeamBySlug(slug: string): Promise<Team | null> {
    return TEAMS_BY_SLUG.get(slug) || null;
  }
}
