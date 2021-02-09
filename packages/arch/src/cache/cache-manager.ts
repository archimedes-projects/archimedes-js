import { LruCache } from './lru-cache'
import { Cache } from './cache'
import { CacheKey } from './cache-key'
import { Md5 } from 'ts-md5'
import { Datetime, isPromise } from '@archimedes/utils'

export class CacheManager {
  private caches: Map<CacheKey, Cache<any>> = new Map()

  private readonly ttl = 500_000

  isCached(cacheKey: CacheKey, args: unknown[]): boolean {
    const existingCache = this.caches.get(cacheKey)
    const hash = this.getHash(args)
    return existingCache?.has(hash) ?? false
  }

  cache(cacheKey: CacheKey, fn: (...fnArgs: unknown[]) => unknown, ...args: any[]) {
    if (!this.caches.has(cacheKey)) {
      this.caches.set(cacheKey, new LruCache())
    }

    const existingCache = this.caches.get(cacheKey)!
    const hash = this.getHash(args)
    const now = Datetime.now()

    if (!this.isCached(cacheKey, args)) {
      existingCache.set(hash, { createdAt: now.toMillis(), returns: fn.apply(this, args) })
    }

    const existingResult = existingCache.get(hash)!
    if (isPromise(existingResult.returns)) {
      existingResult.returns.catch((error: Error) => {
        existingCache.delete(hash)
        throw error
      })
    }

    if (now.toMillis() - existingResult.createdAt > this.ttl) {
      existingCache.delete(hash)
    }

    return existingResult.returns
  }

  invalidateCache(cacheKey: CacheKey) {
    this.caches.delete(cacheKey)
  }

  invalidateCaches() {
    this.caches.clear()
  }

  private getHash(args: unknown[]) {
    return new Md5().appendStr(JSON.stringify(args)).end() as string
  }
}
