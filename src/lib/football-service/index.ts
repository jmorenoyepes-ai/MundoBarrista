// ============================================
// MundoBarrista — Football Data Service
// Fachada Híbrida con Gestión Automática de Caché en Redis
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
  CACHE_TTL_LIVE,
  CACHE_TTL_STATIC,
  getCachedOrFetch,
} from '@/lib/redis';
import { IFootballDataService, MatchQueryOptions } from './types';
import { MockFootballProvider } from './mock-provider';
import { ApiFootballProvider } from './api-football-provider';

class FootballService implements IFootballDataService {
  private provider: IFootballDataService;
  private isMock: boolean;

  constructor() {
    this.isMock = process.env.USE_MOCK_DATA !== 'false';

    if (this.isMock) {
      this.provider = new MockFootballProvider();
      console.log('⚽ [FootballService] Modo activo: MOCK DATA (USE_MOCK_DATA=true)');
    } else {
      this.provider = new ApiFootballProvider();
      console.log('🌐 [FootballService] Modo activo: API-FOOTBALL REAL con Caché Redis');
    }
  }

  /**
   * Obtiene partidos aplicando caché:
   * - 120s si contiene partidos EN VIVO
   * - 6 horas si todos los partidos están finalizados o programados
   */
  async getMatches(options?: MatchQueryOptions): Promise<Match[]> {
    const key = `mb:matches:m${options?.matchday ?? 'all'}:s${options?.status ?? 'all'}:p${options?.phase ?? 'all'}`;

    return getCachedOrFetch(key, CACHE_TTL_LIVE, async () => {
      const matches = await this.provider.getMatches(options);
      return matches;
    });
  }

  /**
   * Obtiene el detalle de un partido:
   * - 120s de caché si está LIVE o HALFTIME
   * - 6 horas (estático) si está FINISHED
   */
  async getMatchById(id: number): Promise<MatchDetail | null> {
    const key = `mb:match:${id}`;

    return getCachedOrFetch(key, CACHE_TTL_LIVE, async () => {
      return this.provider.getMatchById(id);
    });
  }

  /**
   * Tabla de Posiciones Todos contra Todos (Caché de 6 horas)
   */
  async getStandings(season?: number, semester?: number): Promise<StandingItem[]> {
    const key = `mb:standings:${season ?? 2026}:s${semester ?? 1}`;

    return getCachedOrFetch(key, CACHE_TTL_STATIC, async () => {
      return this.provider.getStandings(season, semester);
    });
  }

  /**
   * Tabla de Reclasificación (Caché de 6 horas)
   */
  async getReclassification(year?: number): Promise<ReclassificationItem[]> {
    const key = `mb:reclassification:${year ?? 2026}`;

    return getCachedOrFetch(key, CACHE_TTL_STATIC, async () => {
      return this.provider.getReclassification(year);
    });
  }

  /**
   * Tabla del Descenso FPC por promedio (Caché de 6 horas)
   */
  async getRelegation(): Promise<RelegationItem[]> {
    const key = 'mb:relegation:current';

    return getCachedOrFetch(key, CACHE_TTL_STATIC, async () => {
      return this.provider.getRelegation();
    });
  }

  /**
   * Catálogo de los 20 equipos del FPC (Caché de 6 horas)
   */
  async getTeams(): Promise<Team[]> {
    const key = 'mb:teams:all';

    return getCachedOrFetch(key, CACHE_TTL_STATIC, async () => {
      return this.provider.getTeams();
    });
  }

  /**
   * Equipo por ID (Caché de 6 horas)
   */
  async getTeamById(id: number): Promise<Team | null> {
    const key = `mb:team:${id}`;

    return getCachedOrFetch(key, CACHE_TTL_STATIC, async () => {
      return this.provider.getTeamById(id);
    });
  }

  /**
   * Equipo por Slug (Caché de 6 horas)
   */
  async getTeamBySlug(slug: string): Promise<Team | null> {
    const key = `mb:team:slug:${slug}`;

    return getCachedOrFetch(key, CACHE_TTL_STATIC, async () => {
      return this.provider.getTeamBySlug(slug);
    });
  }
}

// Exportación Singleton del servicio
export const footballService = new FootballService();

// Re-exportación de tipos y proveedores
export * from './types';
export { MockFootballProvider } from './mock-provider';
export { ApiFootballProvider } from './api-football-provider';
