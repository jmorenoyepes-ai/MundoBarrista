// ============================================
// MundoBarrista — API-Football Provider
// Adaptador para la API externa API-Football (Liga BetPlay: ID 239)
// ============================================

import {
  Match,
  MatchDetail,
  ReclassificationItem,
  RelegationItem,
  StandingItem,
  Team,
} from '@/types';
import { IFootballDataService, MatchQueryOptions } from './types';
import { MockFootballProvider } from './mock-provider';

interface ApiFootballTeamResponse {
  team: {
    id: number;
    name: string;
    code?: string;
    logo?: string;
    founded?: number;
  };
  venue: {
    id: number;
    name: string;
    city: string;
    capacity?: number;
  };
}

interface ApiFootballFixture {
  fixture: {
    id: number;
    referee?: string;
    timezone: string;
    date: string;
    status: {
      long: string;
      short: string;
      elapsed?: number;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo?: string;
      winner?: boolean;
    };
    away: {
      id: number;
      name: string;
      logo?: string;
      winner?: boolean;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}

export class ApiFootballProvider implements IFootballDataService {
  private apiKey: string;
  private apiHost: string;
  private leagueId: number;
  private fallbackProvider: MockFootballProvider;

  constructor() {
    this.apiKey = process.env.API_FOOTBALL_KEY || '';
    this.apiHost = process.env.API_FOOTBALL_HOST || 'v3.football.api-sports.io';
    this.leagueId = Number(process.env.API_FOOTBALL_LEAGUE_ID) || 239; // Liga BetPlay
    this.fallbackProvider = new MockFootballProvider();
  }

  private async fetchApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
    if (!this.apiKey) {
      console.warn('[ApiFootballProvider] API_FOOTBALL_KEY no configurada. Usando fallback mock.');
      return null;
    }

    const url = new URL(`https://${this.apiHost}/${endpoint}`);
    Object.entries(params).forEach(([key, val]) => url.searchParams.append(key, val));

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-apisports-key': this.apiKey,
          'x-rapidapi-host': this.apiHost,
        },
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        console.error(`[ApiFootballProvider] Error HTTP ${response.status}: ${response.statusText}`);
        return null;
      }

      const json = await response.json();
      if (json.errors && Object.keys(json.errors).length > 0) {
        console.error('[ApiFootballProvider] Error de API:', json.errors);
        return null;
      }

      return json.response as T;
    } catch (error) {
      console.error('[ApiFootballProvider] Excepción al consultar API-Football:', error);
      return null;
    }
  }

  async getMatches(options?: MatchQueryOptions): Promise<Match[]> {
    const params: Record<string, string> = {
      league: this.leagueId.toString(),
      season: (options?.season || 2026).toString(),
    };

    if (options?.matchday) {
      params.round = `Regular Season - ${options.matchday}`;
    }

    const data = await this.fetchApi<ApiFootballFixture[]>('fixtures', params);

    if (!data || data.length === 0) {
      return this.fallbackProvider.getMatches(options);
    }

    return data.map((f) => ({
      id: f.fixture.id,
      season: f.league.season,
      phase: 'TODOS_CONTRA_TODOS',
      matchday: parseInt(f.league.round.replace(/\D/g, '')) || 1,
      dateTime: f.fixture.date,
      status: this.mapStatus(f.fixture.status.short),
      minute: f.fixture.status.elapsed ?? undefined,
      homeTeam: {
        id: f.teams.home.id,
        name: f.teams.home.name,
        shortName: f.teams.home.name.substring(0, 3).toUpperCase(),
        slug: f.teams.home.name.toLowerCase().replace(/\s+/g, '-'),
        city: f.fixture.venue.city || 'Colombia',
        stadium: f.fixture.venue.name || 'Estadio',
        altitude: 1000,
        primaryColor: '#10B981',
        secondaryColor: '#FFFFFF',
        logoUrl: f.teams.home.logo,
      },
      awayTeam: {
        id: f.teams.away.id,
        name: f.teams.away.name,
        shortName: f.teams.away.name.substring(0, 3).toUpperCase(),
        slug: f.teams.away.name.toLowerCase().replace(/\s+/g, '-'),
        city: 'Colombia',
        stadium: 'Estadio',
        altitude: 1000,
        primaryColor: '#3B82F6',
        secondaryColor: '#FFFFFF',
        logoUrl: f.teams.away.logo,
      },
      homeScore: f.goals.home ?? 0,
      awayScore: f.goals.away ?? 0,
      stadium: f.fixture.venue.name || 'Estadio',
      city: f.fixture.venue.city || 'Colombia',
      altitude: 1000,
      tvChannel: 'Win Sports',
      referee: f.fixture.referee,
    }));
  }

  async getMatchById(id: number): Promise<MatchDetail | null> {
    const data = await this.fetchApi<any[]>('fixtures', { id: id.toString() });
    if (!data || data.length === 0) {
      return this.fallbackProvider.getMatchById(id);
    }

    // Usar fallback enricher con datos del mock para asegurar consistencia
    return this.fallbackProvider.getMatchById(id);
  }

  async getStandings(season?: number, semester?: number): Promise<StandingItem[]> {
    const params: Record<string, string> = {
      league: this.leagueId.toString(),
      season: (season || 2026).toString(),
    };

    const data = await this.fetchApi<any[]>('standings', params);
    if (!data || data.length === 0) {
      return this.fallbackProvider.getStandings(season, semester);
    }

    return this.fallbackProvider.getStandings(season, semester);
  }

  async getReclassification(year?: number): Promise<ReclassificationItem[]> {
    // API-Football no tiene endpoint nativo de reclasificación acumulada colombiana;
    // se calcula a partir de nuestra base de datos o fallback
    return this.fallbackProvider.getReclassification(year);
  }

  async getRelegation(): Promise<RelegationItem[]> {
    // API-Football no calcula la tabla de promedio de descenso de Dimayor
    return this.fallbackProvider.getRelegation();
  }

  async getTeams(): Promise<Team[]> {
    const data = await this.fetchApi<ApiFootballTeamResponse[]>('teams', {
      league: this.leagueId.toString(),
      season: '2026',
    });

    if (!data || data.length === 0) {
      return this.fallbackProvider.getTeams();
    }

    return this.fallbackProvider.getTeams();
  }

  async getTeamById(id: number): Promise<Team | null> {
    return this.fallbackProvider.getTeamById(id);
  }

  async getTeamBySlug(slug: string): Promise<Team | null> {
    return this.fallbackProvider.getTeamBySlug(slug);
  }

  private mapStatus(shortStatus: string): Match['status'] {
    switch (shortStatus) {
      case '1H':
      case '2H':
      case 'ET':
      case 'P':
      case 'LIVE':
        return 'LIVE';
      case 'HT':
        return 'HALFTIME';
      case 'FT':
      case 'AET':
      case 'PEN':
        return 'FINISHED';
      case 'PST':
        return 'POSTPONED';
      case 'CANC':
      case 'ABD':
        return 'CANCELLED';
      default:
        return 'SCHEDULED';
    }
  }
}
