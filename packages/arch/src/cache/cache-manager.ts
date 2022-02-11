import { Cache } from './cache'
import { CacheKey } from './cache-key'
import { Md5 } from 'ts-md5'
import { Datetime, isPromise } from '@archimedes/utils'
import { CacheOptions } from './cache-options'
import { LruCache } from './lru-cache'

export class CacheManager {
  private caches: Map<CacheKey, Cache> = new Map()

  private readonly cacheOptions: CacheOptions

  constructor(cacheOptions?: Partial<CacheOptions>) {
    this.cacheOptions = {
      ttl: cacheOptions?.ttl ?? 500_000,
      cache: cacheOptions?.cache ?? new LruCache()
    }
  }

  has(cacheKey: CacheKey, args: unknown[]): boolean {
    const existingCache = this.caches.get(cacheKey)
    const hash = this.getHash(args)
    return existingCache?.has(hash) ?? false
  }

  set(cacheKey: CacheKey, fn: (...fnArgs: unknown[]) => unknown, ...args: any[]): unknown {
    if (!this.caches.has(cacheKey)) {
      this.caches.set(cacheKey, this.cacheOptions.cache.create())
    }

    const existingCache = this.caches.get(cacheKey)!
    const hash = this.getHash(args)
    const now = Datetime.now()

    if (!this.has(cacheKey, args)) {
      existingCache.set(hash, { createdAt: now.toMillis(), returns: fn.apply(this, args) })
    }

    const existingResult = existingCache.get(hash)!
    if (isPromise(existingResult.returns)) {
      existingResult.returns.catch((error: Error) => {
        existingCache.delete(hash)
        throw error
      })
    }

    if (now.toMillis() - existingResult.createdAt > this.cacheOptions.ttl) {
      existingCache.delete(hash)
    }

    return existingResult.returns
  }

  invalidate(cacheKey: CacheKey): void {
    this.caches.delete(cacheKey)
  }

  invalidateAll(): void {
    this.caches.clear()
  }

  private getHash(args: unknown[]): string {
    return new Md5().appendStr(JSON.stringify(args)).end() as string
  }
}
