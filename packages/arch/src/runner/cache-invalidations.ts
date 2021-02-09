import { InvalidationPolicy } from '../cache/invalidation-policy'
import { CacheKey } from '../cache/cache-key'

type Invalidation = InvalidationPolicy | CacheKey

export class CacheInvalidations {
  private static readonly cacheInvalidations: Map<CacheKey, Invalidation[]> = new Map()

  static set(cacheKey: CacheKey, invalidations: Invalidation[]) {
    this.cacheInvalidations.set(cacheKey, [...(this.cacheInvalidations.get(cacheKey) ?? []), ...invalidations])
  }

  static get invalidations() {
    return this.cacheInvalidations
  }

  static clear() {
    this.cacheInvalidations.clear()
  }
}
