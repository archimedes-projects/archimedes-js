import { Duration } from './duration'

describe('Duration', () => {
  it('should create a duration from a timestamp', () => {
    const duration = Duration.fromTimeStamp('02:30')

    const actual = duration.toIso()

    expect(actual).toBe('PT2H30M')
  })

  it('should check it it a duration', () => {
    const duration = Duration.fromTimeStamp('02:30')

    const actual = Duration.isDuration(duration)

    expect(actual).toBe(true)
  })

  it('should check it it not a duration', () => {
    const duration = 'foo'

    const actual = Duration.isDuration(duration)

    expect(actual).toBe(false)
  })

  test.each`
    a            | b         | expected
    ${'seconds'} | ${'PT1H'} | ${3600}
    ${'minutes'} | ${'PT1H'} | ${60}
    ${'months'}  | ${'P1Y'}  | ${12}
  `('should get the duration as $a', ({ a, b, expected }) => {
    const duration = Duration.fromIso(b)

    const actual = duration.as(a)

    expect(actual).toBe(expected)
  })

  test.each`
    a            | b               | expected
    ${'seconds'} | ${'PT1S'}       | ${1}
    ${'minutes'} | ${'PT5H12M59S'} | ${12}
    ${'years'}   | ${'P42Y12M'}    | ${42}
  `('should get $a from the duration ', ({ a, b, expected }) => {
    const duration = Duration.fromIso(b)

    // @ts-ignore
    const actual = duration[a]

    expect(actual).toBe(expected)
  })
})
