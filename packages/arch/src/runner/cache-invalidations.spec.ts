import { CacheInvalidations } from './cache-invalidations'

describe('CacheInvalidations', () => {
  it('should set invalidations', () => {
    CacheInvalidations.set('foo', ['bar'])

    const actual = CacheInvalidations.invalidations

    expect(actual).toEqual(new Map([['foo', ['bar']]]))
  })
})
