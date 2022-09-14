import { BaseLink } from './base-link'
import { Context } from '../context'
import { CacheManager } from '../../cache/cache-manager'
import { InvalidationPolicy } from '../../cache/invalidation-policy'
import { CacheKey } from '../../cache/cache-key'
import { CacheInvalidations } from '../cache-invalidations'
import { USE_CASE_KEY } from '../../cache/use-case-key'
import { Class } from '@archimedes/utils'

export class CacheLink extends BaseLink {
  constructor(private readonly cacheManager: CacheManager) {
    super()
  }

  async next(context: Context): Promise<void> {
    const asClass = context.useCase as unknown as Class
    const name =
      asClass.prototype?.[USE_CASE_KEY] ??
      asClass.constructor.prototype?.[USE_CASE_KEY] ??
      context.useCase.constructor.name

    if (context.executionOptions.invalidateCache || !this.cacheManager.has(name, [context.param])) {
      this.nextLink.next(context)
    }

    context.result = context.useCase.readonly
      ? (this.cacheManager.set(name, () => context.result, context.param) as Promise<unknown>)
      : context.result

    this.invalidateCache(name)
  }

  private invalidateCache(cacheKey: CacheKey) {
    CacheInvalidations.invalidations.get(cacheKey)?.forEach(invalidation => {
      switch (invalidation) {
        case InvalidationPolicy.NO_CACHE:
          this.cacheManager.invalidate(cacheKey)
          break
        case InvalidationPolicy.ALL:
          this.cacheManager.invalidateAll()
          break
        default:
          this.cacheManager.invalidate(invalidation)
          if (CacheInvalidations.invalidations.has(invalidation)) {
            this.invalidateCache(invalidation)
          }
      }
    })
  }
}
