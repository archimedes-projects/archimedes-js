import { BaseLink } from './base-link'
import { Context } from '../context'
import { CacheManager } from '../../cache/cache-manager'
import { InvalidationPolicy } from '../../cache/invalidation-policy'
import { CacheInvalidations } from '../cache-invalidations'

/**
 * Link to invalidate queries cache when a command is executed.
 * */
export class QueryCacheLink extends BaseLink {
  constructor(private readonly cacheManager: CacheManager) {
    super()
  }

  next(context: Context): void {
    const name = context.useCase.constructor.name
    const isQuery = context.useCase.readonly

    if (isQuery) {
      if (this.cacheManager.isCached(name, [context.param])) {
        context.result = context.useCase.readonly
          ? this.cacheManager.cache(name, () => context.result, context.param)
          : context.result
      } else {
        this.nextLink.next(context)
        context.result = context.useCase.readonly
          ? this.cacheManager.cache(name, () => context.result, context.param)
          : context.result
      }
    } else {
      this.invalidateQueriesCache(name)
      this.nextLink.next(context)
    }
  }

  private invalidateQueriesCache(commandName: string) {
    CacheInvalidations.invalidations.get(commandName)?.forEach(query => {
      switch (query) {
        case InvalidationPolicy.NO_CACHE:
          this.cacheManager.invalidateCache(commandName)
          break
        case InvalidationPolicy.ALL:
          this.cacheManager.invalidateCaches()
          break
        default:
          this.cacheManager.invalidateCache(query)
          if (CacheInvalidations.invalidations.has(query)) {
            this.cacheManager.invalidateCache(query)
          }
      }
    })
  }
}
