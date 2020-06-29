interface IMongo {
  db: string
  host?: string
  port: number | string
  query_limit: number
  username?: string
  password?: string
}

export const config = {
  mongodb: {
    db: process.env.DB_NAME || 'cache-api-local',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    query_limit: 100,
  } as IMongo,
  ttl: (process.env.TTL || 30 * 3600) as number,
  maxCacheData: (process.env.MAX_CACHE_DATA || 50) as number,
}
