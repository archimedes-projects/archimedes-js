import { CallbackFunction } from './callback-function'
import { MaybeProvidedValueIsEmptyError } from './maybe-provided-value-is-empty-error'
import { MaybeEmptyError } from './maybe-empty-error'

export class Maybe<T> {
  private constructor(private value: T | null) {}

  static some<T>(value: T): Maybe<T> {
    if (!this.isValid(value)) {
      throw new MaybeProvidedValueIsEmptyError()
    }
    return new Maybe(value)
  }

  static none<T>(): Maybe<T> {
    return new Maybe<T>(null)
  }

  static fromValue<T>(value: T | undefined | null): Maybe<T> {
    return this.isValid(value) ? Maybe.some(value as T) : Maybe.none<T>()
  }

  private static isValid(value: unknown | null | undefined | Maybe<unknown>): boolean {
    return !(value === undefined || value === null || this.isEmptyMaybe(value))
  }

  private static isEmptyMaybe<R>(value: R): boolean {
    if (this.isMaybe(value)) {
      return !value.has()
    }

    return false
  }

  private static isMaybe(value: unknown | Maybe<unknown>): value is Maybe<unknown> {
    return value instanceof Maybe
  }

  has(): boolean {
    return this.value !== null
  }

  getOrElse(defaultValue: T): T {
    return this.value === null ? defaultValue : this.value
  }

  getOrOther<R = T>(defaultValue: R): T | R {
    return this.value === null ? defaultValue : this.value
  }

  getOrExecute(defaultValue: CallbackFunction<T>): T {
    return this.value === null ? defaultValue() : this.value
  }

  map<R>(f: (wrapped: T) => R): Maybe<R> {
    if (this.value === null) {
      return Maybe.none<R>()
    } else {
      return Maybe.some(f(this.value))
    }
  }

  tap(f: (wrapped: T) => void): Maybe<T> {
    if (this.value !== null) {
      f(this.value)
    }

    return Maybe.fromValue(this.value)
  }

  flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R> {
    if (this.value === null) {
      return Maybe.none<R>()
    } else {
      return f(this.value)
    }
  }

  getOrThrow(error?: Error): T {
    return this.value === null
      ? (() => {
          if (error !== undefined) {
            throw error
          }
          throw new MaybeEmptyError()
        })()
      : this.value
  }

  orElse(value: Maybe<T>) {
    return this.value === null ? value : this
  }
}
