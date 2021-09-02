import { BaseLink } from './base-link'
import { Context } from '../context'
import { CacheManager } from '../../cache/cache-manager'
import { InvalidationPolicy } from '../../cache/invalidation-policy'
import { CacheKey } from '../../cache/cache-key'
import { CacheInvalidations } from '../cache-invalidations'

export class CacheLink extends BaseLink {
  constructor(private readonly cacheManager: CacheManager) {
    super()
  }

  next(context: Context): void {
    const name = context.useCase.constructor.name

    if (!this.cacheManager.isCached(name, [context.param])) {
      this.nextLink.next(context)
    }

    context.result = context.useCase.readonly
      ? this.cacheManager.cache(name, () => context.result, context.param)
      : context.result

    this.invalidateCache(name)
  }

  private invalidateCache(cacheKey: CacheKey) {
    CacheInvalidations.invalidations.get(cacheKey)?.forEach(invalidation => {
      switch (invalidation) {
        case InvalidationPolicy.NO_CACHE:
          this.cacheManager.invalidateCache(cacheKey)
          break
        case InvalidationPolicy.ALL:
          this.cacheManager.invalidateCaches()
          break
        default:
          this.cacheManager.invalidateCache(invalidation)
          if (CacheInvalidations.invalidations.has(invalidation)) {
            this.invalidateCache(invalidation)
          }
      }
    })
  }
}
