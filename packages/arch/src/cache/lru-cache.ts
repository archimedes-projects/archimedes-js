import { Cache } from './cache'
import lru, { Lru } from 'tiny-lru'
import { CacheKey } from './cache-key'

export class LruCache<T> implements Cache<T> {
  private _lru: Lru<T> = lru(100)

  get(key: CacheKey): T | undefined {
    return this._lru.get(key)
  }

  set(key: CacheKey, value: T) {
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
