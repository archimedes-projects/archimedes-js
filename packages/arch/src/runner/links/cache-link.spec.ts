import { CacheLink } from './cache-link'
import { anything, instance, mock, verify, when } from 'ts-mockito'
import { CacheManager } from '../../cache/cache-manager'
import { Context } from '../context'
import { UseCase } from '../../use-case/use-case'
import { Link } from './link'
import { CacheInvalidations } from '../cache-invalidations'
import { InvalidationPolicy } from '../../cache/invalidation-policy'
import { Command } from '../../use-case/command'

describe('CacheLink', () => {
  it('should use the cache', async () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.has(anything(), anything())).thenReturn(false)

    class MockUseCase extends UseCase<unknown, unknown> {
      readonly = true

      async internalExecute(): Promise<void> {}
    }

    const context = Context.create({
      useCase: new MockUseCase(),
      param: undefined,
      executionOptions: { inlineError: false }
    })
    cacheLink.setNext(instance(link))

    await cacheLink.next(context)

    verify(link.next(anything())).once()
  })

  it('should break the link if it is cached', async () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.has(anything(), anything())).thenReturn(true)

    class MockUseCase extends UseCase<unknown, unknown> {
      readonly = true

      async internalExecute(): Promise<void> {}
    }

    const context = Context.create({
      useCase: new MockUseCase(),
      param: undefined,
      executionOptions: { inlineError: false }
    })
    cacheLink.setNext(instance(link))

    await cacheLink.next(context)

    verify(link.next(anything())).never()
  })

  it('should not cache commands', async () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.has(anything(), anything())).thenReturn(false)

    class MockUseCase extends Command<unknown, unknown> {
      async internalExecute(): Promise<void> {}
    }

    const context = Context.create({
      useCase: new MockUseCase(),
      param: undefined,
      executionOptions: { inlineError: false }
    })
    cacheLink.setNext(instance(link))

    await cacheLink.next(context)

    verify(cacheManager.set(anything(), anything())).never()
  })

  it('should invalidate using no cache policy', async () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.has(anything(), anything())).thenReturn(true)

    class MockUseCase extends UseCase<unknown, unknown> {
      readonly = true

      async internalExecute(): Promise<void> {}
    }

    CacheInvalidations.set(MockUseCase.name, [InvalidationPolicy.NO_CACHE])
    const context = Context.create({
      useCase: new MockUseCase(),
      param: undefined,
      executionOptions: { inlineError: false }
    })
    cacheLink.setNext(instance(link))

    await cacheLink.next(context)

    verify(cacheManager.invalidate(MockUseCase.name)).once()
    CacheInvalidations.clear()
  })

  it('should invalidate using all cache policy', async () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.has(anything(), anything())).thenReturn(true)

    class MockUseCase extends UseCase<unknown, unknown> {
      readonly = true

      async internalExecute(): Promise<void> {}
    }

    CacheInvalidations.set(MockUseCase.name, [InvalidationPolicy.ALL])
    const context = Context.create({
      useCase: new MockUseCase(),
      param: undefined,
      executionOptions: { inlineError: false }
    })
    cacheLink.setNext(instance(link))

    await cacheLink.next(context)

    verify(cacheManager.invalidateAll()).once()
    CacheInvalidations.clear()
  })

  it('should invalidate using all cache policy', async () => {
    const { link, cacheManager, cacheLink } = setup()
    when(cacheManager.has(anything(), anything())).thenReturn(true)

    class MockUseCase extends UseCase<unknown, unknown> {
      readonly = true

      async internalExecute(): Promise<void> {}
    }

    CacheInvalidations.set(MockUseCase.name, ['Foo'])
    CacheInvalidations.set('Foo', ['Bar'])
    const context = Context.create({
      useCase: new MockUseCase(),
      param: undefined,
      executionOptions: { inlineError: false }
    })
    cacheLink.setNext(instance(link))

    await cacheLink.next(context)

    verify(cacheManager.invalidate('Foo')).once()
    verify(cacheManager.invalidate('Bar')).once()
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
    cacheLink: new CacheLink(instance(cacheManager))
  }
}
