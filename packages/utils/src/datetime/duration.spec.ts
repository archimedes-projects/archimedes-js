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
})
