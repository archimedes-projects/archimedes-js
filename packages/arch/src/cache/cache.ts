import { CacheKey } from './cache-key'

type Milliseconds = number

export interface CacheResult<T = unknown> {
  createdAt: Milliseconds
  returns: T
}

export interface Cache<T = unknown> {
  create(): Cache<T>
  get(key: CacheKey): CacheResult<T> | undefined
  set(key: CacheKey, value: CacheResult<T>): void
  has(key: CacheKey): boolean
  delete(key: CacheKey): void
  clear(): void
}
