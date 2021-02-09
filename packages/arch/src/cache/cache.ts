import { CacheKey } from './cache-key'

export interface Cache<T> {
  get(key: CacheKey): T | undefined
  set(key: CacheKey, value: T): void
  has(key: CacheKey): boolean
  delete(key: CacheKey): void
  clear(): void
}
