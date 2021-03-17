import { Maybe } from './maybe'
import { MaybeEmptyError } from './maybe-empty-error'

describe('Maybe', () => {
  it('should handle an undefined value', () => {
    const maybe = Maybe.from<string>(undefined)
    expect(maybe.getOrElse('test')).toBe('test')
  })

  it('should a false value', () => {
    const maybe = Maybe.from<boolean>(false)
    expect(maybe.getOrElse(true)).toBe(false)
  })

  it('should handle a string value', () => {
    const maybe = Maybe.from('test')
    expect(maybe.getOrElse('')).toBe('test')
  })

  it('should handle an empty string value', () => {
    const maybe = Maybe.from('')
    expect(maybe.getOrElse('test')).toBe('')
  })

  it('should handle a null value', () => {
    const maybe = Maybe.from<string>(null)
    expect(maybe.getOrElse('test')).toBe('test')
  })

  it('should handle a numeric value', () => {
    const maybe = Maybe.from(42)
    expect(maybe.getOrElse(0)).toBe(42)
  })

  it('should handle the zero value as valid', () => {
    const maybe = Maybe.from(0)
    expect(maybe.getOrElse(1)).toBe(0)
  })

  it('should handle an empty maybe as invalid', () => {
    const maybe = Maybe.from(Maybe.none())
    expect(maybe.has()).toBe(false)
  })

  it('should tap a value', () => {
    const maybe = Maybe.from('value')
    let actual = false

    maybe.tap(() => {
      actual = true
    })

    expect(actual).toBe(true)
  })

  it('should not tap a value', () => {
    const maybe = Maybe.none()
    let actual = false

    maybe.tap(() => {
      actual = true
    })

    expect(actual).toBe(false)
  })

  it('should handle a callback as a default value', () => {
    const mock = jest.fn()
    const maybe = Maybe.from(null)
    maybe.getOrExecute(mock)
    expect(mock).toHaveBeenCalled()
  })

  it('should check if it has a value', () => {
    const maybe = Maybe.from('hello')
    expect(maybe.has()).toBe(true)
  })

  it('should check if it does not have a value', () => {
    const maybe = Maybe.from<string>(null)
    expect(maybe.has()).toBe(false)
  })

  it('should handle none value', () => {
    const maybe = Maybe.none()
    expect(maybe.getOrElse('test')).toBe('test')
  })

  it('should handle or else value when the value does exist', () => {
    const maybe = Maybe.from('bar')

    const actual = maybe.orElse(Maybe.from('foo'))

    expect(actual).toEqual(Maybe.from('bar'))
  })

  it('should handle or else value when the value does not exist', () => {
    const maybe = Maybe.none()

    const actual = maybe.orElse(Maybe.from('foo'))

    expect(actual).toEqual(Maybe.from('foo'))
  })

  it('should get or throw', () => {
    const maybe = Maybe.none()
    expect(() => {
      maybe.getOrThrow(new Error('foo'))
    }).toThrowError('foo')
  })

  it('should be able to map existing values', () => {
    const maybeMap = Maybe.from({ a: 'a' })
    expect(maybeMap.map(e => e.a).getOrElse('b')).toBe('a')
  })

  it('should be able to map non existing values', () => {
    type Type = { foo: Maybe<{ bar: string }> }
    const maybeMap = Maybe.from<Type>({ foo: Maybe.none() })
    expect(
      maybeMap
        .getOrExecute(() => {
          throw new MaybeEmptyError()
        })
        .foo.map(x => x.bar)
    ).toEqual(Maybe.none())
  })

  it('should be able to flat map existing values', () => {
    type Type = { foo: Maybe<{ bar: string }> }
    const maybeMap = Maybe.from<Type>({ foo: Maybe.from({ bar: 'qux' }) })
    expect(maybeMap.flatMap(x => x.foo).map(x => x.bar)).toEqual(Maybe.from('qux'))
  })

  it('should be able to flat map non existing values', () => {
    type Type = { foo: Maybe<{ bar: string }> }
    const maybeMap = Maybe.none<Type>()
    expect(maybeMap.flatMap(x => x.foo)).toEqual(Maybe.none())
  })
})
