import { anything, instance, mock, verify, when } from 'ts-mockito'
import { CacheManager } from '../../cache/cache-manager'
import { Context } from '../context'
import { UseCase } from '../../use-case/use-case'
import { Link } from './link'
import { CacheInvalidations } from '../cache-invalidations'
import { InvalidationPolicy } from '../../cache/invalidation-policy'
import { Command } from '../../use-case/command'
import { QueryCacheLink } from './query-cache-link'

describe('QueryCacheLink', () => {
  it('should use the queries cache', () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.isCached(anything(), anything())).thenReturn(false)
    class MockQuery extends UseCase<unknown, unknown> {
      readonly = true
      async internalExecute(): Promise<void> {}
    }
    const context = Context.create({
      useCase: new MockQuery(),
      param: undefined,
      executionOptions: {}
    })
    cacheLink.setNext(instance(link))

    cacheLink.next(context)

    verify(link.next(anything())).once()
  })

  it('should break the links chain if the query is cached', () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.isCached(anything(), anything())).thenReturn(true)
    class MockQuery extends UseCase<unknown, unknown> {
      readonly = true
      async internalExecute(): Promise<void> {}
    }
    const context = Context.create({
      useCase: new MockQuery(),
      param: undefined,
      executionOptions: {}
    })
    cacheLink.setNext(instance(link))

    cacheLink.next(context)

    verify(link.next(anything())).never()
  })

  it('should not invalidate if it is a query', () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.isCached(anything(), anything())).thenReturn(false)
    class MockQuery extends UseCase<unknown, unknown> {
      readonly = true
      async internalExecute(): Promise<void> {}
    }
    const context = Context.create({
      useCase: new MockQuery(),
      param: undefined,
      executionOptions: {}
    })
    cacheLink.setNext(instance(link))
    cacheLink.next(context)

    verify(link.next(anything())).once()
    verify(cacheManager.invalidateCache(anything())).never()
  })

  it('should not cache commands', () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.isCached(anything(), anything())).thenReturn(false)
    class MockCommand extends Command<unknown, unknown> {
      readonly = false
      async internalExecute(): Promise<void> {}
    }
    const context = Context.create({
      useCase: new MockCommand(),
      param: undefined,
      executionOptions: { }
    })
    cacheLink.setNext(instance(link))

    cacheLink.next(context)

    verify(cacheManager.cache(anything(), anything())).never()
  })

  it('should invalidate using no cache policy', () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.isCached(anything(), anything())).thenReturn(true)
    class MockCommand extends Command<unknown, unknown> {
      readonly = false
      async internalExecute(): Promise<void> {}
    }
    CacheInvalidations.set(MockCommand.name, [InvalidationPolicy.NO_CACHE])
    const context = Context.create({
      useCase: new MockCommand(),
      param: undefined,
      executionOptions: { }
    })
    cacheLink.setNext(instance(link))

    cacheLink.next(context)

    verify(cacheManager.invalidateCache(MockCommand.name)).once()
    CacheInvalidations.clear()
  })

  it('should invalidate using all cache policy', () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.isCached(anything(), anything())).thenReturn(true)
    class MockCommand extends UseCase<unknown, unknown> {
      readonly = false
      async internalExecute(): Promise<void> {}
    }
    CacheInvalidations.set(MockCommand.name, ['Foo', 'Bar'])
    const context = Context.create({
      useCase: new MockCommand(),
      param: undefined,
      executionOptions: { }
    })
    cacheLink.setNext(instance(link))

    cacheLink.next(context)

    verify(cacheManager.invalidateCache('Foo')).once()
    verify(cacheManager.invalidateCache('Bar')).once()
    CacheInvalidations.clear()
  })
})

function setup() {
  const cacheManager = mock(CacheManager)
  const context = mock(Context)
  const link = mock<Link>()

  return {
    link,
    context,
    cacheManager,
    cacheLink: new QueryCacheLink(instance(cacheManager))
  }
}
