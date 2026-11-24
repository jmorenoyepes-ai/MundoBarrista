// ============================================
// MundoBarrista — Redis Client Singleton
// Conexión con ioredis, singleton para evitar
// múltiples conexiones en desarrollo (HMR)
// ============================================

import Redis from 'ioredis';

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

function createRedisClient(): Redis {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

  const client = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy(times) {
      // Si falla 2 veces seguidas, pausa los reintentos para no bloquear
      if (times > 2) return null;
      return 1000;
    },
    lazyConnect: true,
  });

  client.on('error', (err) => {
    console.error('[Redis] Error de conexión:', err.message);
  });

  client.on('connect', () => {
    console.log('[Redis] Conectado exitosamente');
  });

  return client;
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}

// ============================================
// Helpers de caché
// ============================================

/** TTL en segundos para partidos en vivo */
export const CACHE_TTL_LIVE = 120;

/** TTL en segundos para tablas y calendarios (6 horas) */
export const CACHE_TTL_STATIC = 21600;

/**
 * Obtiene datos del caché o ejecuta la función y guarda el resultado.
 */
export async function getCachedOrFetch<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  try {
    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached) as T;
    }
  } catch {
    // Si Redis falla, continuamos sin caché
    console.warn(`[Redis] Error leyendo caché para key: ${key}`);
  }

  const data = await fetchFn();

  try {
    await redis.set(key, JSON.stringify(data), 'EX', ttlSeconds);
  } catch {
    console.warn(`[Redis] Error guardando caché para key: ${key}`);
  }

  return data;
}
