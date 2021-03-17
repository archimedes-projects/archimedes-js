import { HttpParams } from './http-params'

describe('HttpParams', () => {
  it('should add a value', () => {
    const given = HttpParams.create().set('foo', 'bar').set('baz', 'qux')

    const actual = given.toString()

    expect(actual).toBe('foo=bar&baz=qux')
  })
})
