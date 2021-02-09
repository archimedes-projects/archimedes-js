import { CacheManager } from './cache-manager'

describe('CacheManager', () => {
  it('should return the result', () => {
    const { cacheManager } = setup()
    let count = 0

    const actual = cacheManager.cache('foo', () => {
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
    cacheManager.cache('foo', fn)
    cacheManager.cache('foo', fn)
    const actual = cacheManager.cache('foo', fn)

    expect(actual).toBe(1)
  })

  it('should cache the execution depending on the parameters', () => {
    const { cacheManager } = setup()
    let count = 0

    const fn = (otherValue?: number): number => {
      count++
      return count + (otherValue ?? 0)
    }
    cacheManager.cache('foo', () => fn())
    cacheManager.cache('foo', () => fn())
    cacheManager.cache('foo', () => fn(1))
    const actual = cacheManager.cache('foo', () => fn(1))

    expect(actual).toBe(1)
  })
})

function setup() {
  return {
    cacheManager: new CacheManager()
  }
}
