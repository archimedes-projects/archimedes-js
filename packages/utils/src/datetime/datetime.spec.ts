import { Datetime } from './datetime'
import { MockDatetime } from './mock-datetime'
import { Duration } from './duration'

describe('Datetime', () => {
  beforeEach(() => {
    MockDatetime.mock(Datetime.fromIsoString('2019-07-22T01:02:03Z'))
    MockDatetime.mockTimezone('utc')
  })

  afterEach(() => {
    MockDatetime.reset()
    MockDatetime.resetMockTimezone()
  })

  it('should get the date formatted in ISO 8601', () => {
    const datetime = Datetime.fromIsoString('2019-07-22T01:02:03Z')

    const actual = datetime.toIso()

    expect(actual).toBe('2019-07-22T01:02:03Z')
  })

  it('should get the months', () => {
    const actual = Datetime.months()

    expect(actual).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ])
  })

  it('should get the months in other length format', () => {
    const actual = Datetime.months('short')

    expect(actual).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
  })

  it('should get the weekdays', () => {
    const actual = Datetime.weekdays()

    expect(actual).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
  })

  it('should get the weekdays in other length format', () => {
    const actual = Datetime.weekdays('short')

    expect(actual).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  })

  it('should add padding with leading zeroes with a maximum of two', () => {
    const datetime = Datetime.fromIsoString('2019-07-22T01:02:03Z')

    const actual = datetime.toIso()

    expect(actual).toBe('2019-07-22T01:02:03Z')
  })

  it('should get date from JavaScript date', () => {
    const date = Date.UTC(2019, 0, 1)

    const actual = Datetime.fromJsDate(new Date(date))

    expect(actual.toIso()).toBe('2019-01-01T00:00:00Z')
  })

  it('should get jsData', () => {
    const datetime = Datetime.fromIsoString('2019-07-22T01:02:03Z')

    const actual = datetime.jsDate

    expect(actual.toISOString()).toBe('2019-07-22T01:02:03.000Z')
  })

  it('should get date from format', () => {
    const datetime = Datetime.fromFormat('01/01/2020', 'D')

    expect(datetime.toIso()).toBe('2020-01-01T00:00:00Z')
  })

  it('should get a new date shifted n positive days', () => {
    const datetime = Datetime.fromIsoString('2019-07-22T01:02:03Z')

    const actual = datetime.add({ day: 3 }).toIso()

    expect(actual).toBe('2019-07-25T01:02:03Z')
  })

  it('should get a new date shifted n negative days', () => {
    const datetime = Datetime.fromIsoString('2019-07-22T01:02:03Z')

    const actual = datetime.add({ day: -3 }).toIso()

    expect(actual).toBe('2019-07-19T01:02:03Z')
  })

  it('should get the difference between two dates', () => {
    const datetimeA = Datetime.fromIsoString('2020-08-22T01:02:03Z')
    const datetimeB = Datetime.fromIsoString('2020-08-21T01:02:03Z')

    const actual = datetimeA.difference(datetimeB).as('days')

    expect(actual).toBe(1)
  })

  it("should return today's date", () => {
    const datetime = Datetime.now()

    const actual = datetime.toIso()

    expect(actual).toBe('2019-07-22T01:02:03Z')
  })

  it('should clone', () => {
    const datetime = Datetime.fromIsoString('2019-07-22T01:02:03Z')

    const actual = datetime.clone().toIso()

    expect(actual).toBe('2019-07-22T01:02:03Z')
  })

  it('should have default values when using new', () => {
    const datetime = Datetime.new({})

    const actual = datetime.toIso()

    expect(actual).toBe('1970-01-01T00:00:00Z')
  })

  it('should compare when one date is greater', () => {
    const today = Datetime.fromIsoString('2019-07-22T01:02:03Z')
    const tomorrow = today.add({ day: 1 })

    const actual = tomorrow > today

    expect(actual).toBe(true)
  })

  it('should compare when one date is lower', () => {
    const today = Datetime.fromIsoString('2019-07-22T01:02:03Z')
    const yesterday = today.add({ day: -1 })

    const actual = today < yesterday

    expect(actual).toBe(false)
  })

  it('should add a duration', () => {
    const today = Datetime.fromIsoString('2019-07-22T00:00:00Z')
    const duration = Duration.fromTimeStamp('02:30')
    const actual = today.add(duration)

    expect(actual).toEqual(Datetime.fromIsoString('2019-07-22T02:30:00Z'))
  })

  it('should check when dates are the same', () => {
    const todayA = Datetime.fromIsoString('2019-07-22T01:02:03Z')
    const todayB = Datetime.fromIsoString('2019-07-22T01:02:03Z')

    const actual = todayA.equals(todayB)

    expect(actual).toBe(true)
  })

  it('should create a string from ISO', () => {
    const datetime = Datetime.fromIsoString('2019-08-30T12:00:00Z')

    const actual = datetime.toIso()

    expect(actual).toBe('2019-08-30T12:00:00Z')
  })

  it('should get the year', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T10:02:00Z')

    const actual = datetime.year

    expect(actual).toBe(2019)
  })

  it('should get the days in a month', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T10:02:00Z')

    const actual = datetime.daysInMonth

    expect(actual).toBe(31)
  })

  it('should get the month', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T10:02:00Z')

    const actual = datetime.month

    expect(actual).toBe(1)
  })

  it('should get the day', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T00:00:00Z')

    const actual = datetime.day

    expect(actual).toBe(30)
  })

  it('should get weekday', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T00:00:00Z')

    const actual = datetime.weekday

    expect(actual).toBe(3)
  })

  it('should get the hour', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T01:01:42.123Z')

    const actual = datetime.hour

    expect(actual).toBe(1)
  })

  it('should get the minutes', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T00:01:42.123Z')

    const actual = datetime.minute

    expect(actual).toBe(1)
  })

  it('should get seconds', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T00:00:42.123Z')

    const actual = datetime.second

    expect(actual).toBe(42)
  })

  it('should get milliseconds', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T00:00:00.123Z')

    const actual = datetime.millisecond

    expect(actual).toBe(123)
  })

  it('should add a given option', () => {
    const datetime = Datetime.fromIsoString('2019-01-30T10:02:00Z')

    const actual = datetime.add({ year: 1, month: 1, day: 1 }).toIso()

    expect(actual).toBe('2020-03-01T10:02:00Z')
  })

  it('should set a date', () => {
    const date = Datetime.fromIsoString('2019-01-30T10:02:00Z')

    const actual = date.set({ year: 2018, month: 2, day: 15 }).toIso()

    expect(actual).toBe('2018-02-15T10:02:00Z')
  })

  it('should check if it is valid', () => {
    const date = Datetime.fromIsoString('2019-01-30A')

    const actual = date.isValid()

    expect(actual).toBe(false)
  })

  it('should convert an UTC time as a local time', () => {
    MockDatetime.mockTimezone('Europe/Madrid')
    const date = Datetime.fromIsoString('2019-01-30T10:02:00Z')

    const actual = date.asLocal().toIso()

    expect(actual).toBe('2019-01-30T10:02:00Z')
  })

  it('should have a to string implementation', () => {
    const date = Datetime.fromIsoString('2019-01-30T10:02:00Z')

    const actual = date.toString()

    expect(actual).toBe('2019-01-30T10:02:00Z')
  })
})
