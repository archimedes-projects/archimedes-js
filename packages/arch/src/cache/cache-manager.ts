import { LruCache } from './lru-cache'
import { Cache } from './cache'
import { CacheKey } from './cache-key'
import { Datetime, isPromise } from '@archimedes/utils'

export class CacheManager {
  private caches: Map<CacheKey, Cache<any>> = new Map()

  private readonly ttl = 500_000

  isCached(cacheKey: CacheKey, args: unknown[]): boolean {
    const existingCache = this.caches.get(cacheKey)
    const hash = this.serializeQryArgs(args)
    return existingCache?.has(hash) ?? false
  }

  cache(cacheKey: CacheKey, fn: (...fnArgs: unknown[]) => unknown, ...args: any[]) {
    if (!this.caches.has(cacheKey)) {
      this.caches.set(cacheKey, new LruCache())
    }

    const existingCache = this.caches.get(cacheKey)!
    const hash = this.serializeQryArgs(args)
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

  /**
   * Serialize the query arguments into a readable string
   *
   * @param {unknown[]} args The function arguments.
   * @returns {string} The hash of the passed arguments.
   *
   * @private
   */
  private serializeQryArgs(args: unknown[]) {
    // Sort the object keys before stringifying, to prevent useQuery({ a: 1, b: 2 }) having a different cache key than useQuery({ b: 2, a: 1 })
    return JSON.stringify(args, (key, value) =>
      this.isPlainObject(value)
        ? Object.keys(value)
          .sort()
          .reduce<any>((acc, key) => {
            acc[key] = (value as any)[key]
            return acc
          }, {})
        : value
    )
  }

  /**
   * Returns true if the passed value is "plain" object, i.e. an object whose
   * prototype is the root `Object.prototype`. This includes objects created
   * using object literals, but not for instance for class instances.
   *
   * @param {any} value The value to inspect.
   * @returns {boolean} True if the argument appears to be a plain object.
   *
   * @private
   */
  private isPlainObject(value: unknown): value is object {
    if (typeof value !== "object" || value === null) return false

    let proto = value
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(value) === proto
  }
}
