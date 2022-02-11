import { CacheManager } from './cache-manager'
import { CacheOptions } from './cache-options'
import { anyString, capture, instance, mock, verify, when } from 'ts-mockito'
import { Cache, CacheResult } from './cache'
import { Datetime, MockDatetime } from '@archimedes/utils'

describe('CacheManager', () => {
  it('should return the result', () => {
    const { cacheManager } = setup()
    let count = 0

    const actual = cacheManager.set('foo', () => {
      count++
      return count
    })

    expect(actual).toBe(1)
  })

  it('should cache the execution', () => {
    const { cacheManager } = setup()
    let count = 0

    const fn = () => {
      count++
      return count
    }
    cacheManager.set('foo', fn)
    cacheManager.set('foo', fn)
    const actual = cacheManager.set('foo', fn)

    expect(actual).toBe(1)
  })

  it('should cache the execution depending on the parameters', () => {
    const { cacheManager } = setup()
    let count = 0

    const fn = (otherValue?: number): number => {
      count++
      return count + (otherValue ?? 0)
    }
    cacheManager.set('foo', () => fn())
    cacheManager.set('foo', () => fn())
    cacheManager.set('foo', () => fn(1))
    const actual = cacheManager.set('foo', () => fn(1))

    expect(actual).toBe(1)
  })

  it('should use custom cache', () => {
    MockDatetime.mock(Datetime.fromIsoString('2020-01-01T00:00:00Z'))
    const cache = mock<Cache>()
    when(cache.create()).thenReturn(instance(cache))
    when(cache.get(anyString())).thenReturn({ createdAt: 1, returns: 1 })
    const { cacheManager } = setup({ cache: instance(cache) })
    let count = 0

    const fn = () => {
      count++
      return count
    }

    cacheManager.set('foo', fn)

    const [first, second] = capture(cache.set).last()
    expect(first).toBe('d751713988987e9331980363e24189ce')
    expect(second).toEqual<CacheResult>({ createdAt: 1577836800000, returns: 1 })
  })

  it('should delete cache if ttl has passed', () => {
    MockDatetime.mock(Datetime.fromIsoString('2020-01-01T00:00:00Z'))
    const mockedDatetime = Datetime.now().toMillis() - 1
    const cache = mock<Cache>()
    when(cache.create()).thenReturn(instance(cache))
    when(cache.get(anyString())).thenReturn({ createdAt: mockedDatetime, returns: 1 })
    const { cacheManager } = setup({ cache: instance(cache), ttl: 0 })
    let count = 0

    const fn = () => {
      count++
      return count
    }

    cacheManager.set('foo', fn)

    verify(cache.delete(anyString())).once()
  })

  it('should not delete cache if the ttl has not passed', () => {
    MockDatetime.mock(Datetime.fromIsoString('2020-01-01T00:00:00Z'))
    const mockedDatetime = Datetime.now().toMillis() - 1
    const cache = mock<Cache>()
    when(cache.create()).thenReturn(instance(cache))
    when(cache.get(anyString())).thenReturn({ createdAt: mockedDatetime, returns: 1 })
    const { cacheManager } = setup({ cache: instance(cache), ttl: 1 })
    let count = 0

    const fn = () => {
      count++
      return count
    }

    cacheManager.set('foo', fn)

    verify(cache.delete(anyString())).never()
  })

  it('should use different caches for different keys', () => {
    MockDatetime.mock(Datetime.fromIsoString('2020-01-01T00:00:00Z'))
    const mockedDatetime = Datetime.now().toMillis() - 1
    const cache = mock<Cache>()
    when(cache.create()).thenReturn(instance(cache))
    when(cache.get(anyString())).thenReturn({ createdAt: mockedDatetime, returns: 1 })
    const { cacheManager } = setup({ cache: instance(cache) })

    const fn = (): string => 'foo'

    cacheManager.set('foo', () => fn())
    cacheManager.set('bar', () => fn())

    verify(cache.create()).twice()
  })
})

function setup(cacheOptions?: Partial<CacheOptions>) {
  return {
    cacheManager: new CacheManager(cacheOptions)
  }
}
