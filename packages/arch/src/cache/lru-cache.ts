import { Cache, CacheResult } from './cache'
import lru, { Lru } from 'tiny-lru'
import { CacheKey } from './cache-key'

export class LruCache<T> implements Cache<T> {
  private _lru: Lru<CacheResult<T>> = lru(100)

  get(key: CacheKey): CacheResult<T> | undefined {
    return this._lru.get(key)
  }

  set(key: CacheKey, value: CacheResult<T>) {
    this._lru.set(key, value)
  }

  delete(key: CacheKey) {
    this._lru.delete(key)
  }

  clear() {
    this._lru.clear()
  }

  has(key: CacheKey) {
    return this._lru.has(key)
  }
}
