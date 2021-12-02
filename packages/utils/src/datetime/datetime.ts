import { DateTime as LuxonDatetime, Info } from 'luxon'
import { DateObject } from './date-object'
import { Duration } from './duration'
import { StringUnitLength } from './string-unit-length'
import { InfoOptions } from './info-options'

export class Datetime {
  static readonly DATETIME_FULL = LuxonDatetime.DATETIME_FULL
  static readonly DATETIME_FULL_WITH_SECONDS = LuxonDatetime.DATETIME_FULL_WITH_SECONDS
  static readonly DATETIME_HUGE = LuxonDatetime.DATETIME_HUGE
  static readonly DATETIME_HUGE_WITH_SECONDS = LuxonDatetime.DATETIME_HUGE_WITH_SECONDS
  static readonly DATETIME_MED = LuxonDatetime.DATETIME_MED
  static readonly DATETIME_MED_WITH_SECONDS = LuxonDatetime.DATETIME_MED_WITH_SECONDS
  static readonly DATETIME_MED_WITH_WEEKDAY = LuxonDatetime.DATETIME_MED_WITH_WEEKDAY
  static readonly DATETIME_SHORT = LuxonDatetime.DATETIME_SHORT
  static readonly DATETIME_SHORT_WITH_SECONDS = LuxonDatetime.DATETIME_SHORT_WITH_SECONDS
  static readonly DATE_FULL = LuxonDatetime.DATE_FULL
  static readonly DATE_HUGE = LuxonDatetime.DATE_HUGE
  static readonly DATE_MED = LuxonDatetime.DATE_MED
  static readonly DATE_MED_WITH_WEEKDAY = LuxonDatetime.DATE_MED_WITH_WEEKDAY
  static readonly DATE_SHORT = LuxonDatetime.DATE_SHORT
  static readonly TIME_24_SIMPLE = LuxonDatetime.TIME_24_SIMPLE
  static readonly TIME_24_WITH_LONG_OFFSET = LuxonDatetime.TIME_24_WITH_LONG_OFFSET
  static readonly TIME_24_WITH_SECONDS = LuxonDatetime.TIME_24_WITH_SECONDS
  static readonly TIME_24_WITH_SHORT_OFFSET = LuxonDatetime.TIME_24_WITH_SHORT_OFFSET
  static readonly TIME_SIMPLE = LuxonDatetime.TIME_SIMPLE
  static readonly TIME_WITH_LONG_OFFSET = LuxonDatetime.TIME_WITH_LONG_OFFSET
  static readonly TIME_WITH_SECONDS = LuxonDatetime.TIME_WITH_SECONDS
  static readonly TIME_WITH_SHORT_OFFSET = LuxonDatetime.TIME_WITH_SHORT_OFFSET

  static now(): Datetime {
    return new Datetime(LuxonDatetime.local().setZone('utc'))
  }

  static new(
    year?: number,
    month?: number,
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number
  ): Datetime
  static new(dateObject: DateObject): Datetime
  static new(
    dateObject: DateObject | number = 1970,
    month: number = 1,
    day: number = 1,
    hour: number = 0,
    minute: number = 0,
    second: number = 0,
    millisecond: number = 0
  ): Datetime {
    if (typeof dateObject === 'object') {
      const defaultDateObject: DateObject = {
        year: 1970,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        ...dateObject
      }
      return new Datetime(LuxonDatetime.fromObject(defaultDateObject))
    }

    return new Datetime(
      LuxonDatetime.fromObject({
        year: dateObject,
        month,
        day,
        hour,
        minute,
        second,
        millisecond
      })
    )
  }

  /**
   *
   * @param isoString Format is as follows: 2020-09-16T11:14:33Z. It must include the Z
   */
  static fromIsoString(isoString: string) {
    return new Datetime(LuxonDatetime.fromISO(isoString))
  }

  static fromJsDate(date: Date) {
    return new Datetime(LuxonDatetime.fromJSDate(date))
  }

  /**
   *
   * @param value 2020/01/02
   * @param format YYYY/MM/DD
   * @param options
   */
  static fromFormat(value: string, format: string, options: { locale: string } = { locale: 'es-ES' }) {
    return new Datetime(LuxonDatetime.fromFormat(value, format, options))
  }

  static months(length?: StringUnitLength, options?: InfoOptions) {
    return Info.months(length, options)
  }

  static weekdays(length?: StringUnitLength, options?: InfoOptions) {
    return Info.weekdays(length, options)
  }

  constructor(private readonly _value: LuxonDatetime, isLocal: boolean = false) {
    if (isLocal) {
      this._value = _value
    } else {
      this._value = this._value.setZone('utc')
    }
  }

  get jsDate(): Date {
    return this._value.toJSDate()
  }

  get daysInMonth(): number {
    return this._value.daysInMonth
  }

  get year(): number {
    return this._value.year
  }

  get month(): number {
    return this._value.month
  }

  get day(): number {
    return this._value.day
  }

  get hour(): number {
    return this._value.hour
  }

  get minute(): number {
    return this._value.minute
  }

  get second(): number {
    return this._value.second
  }

  get millisecond(): number {
    return this._value.millisecond
  }

  get weekday() {
    return this._value.weekday
  }

  clone(): Datetime {
    return new Datetime(this._value)
  }

  add(dateObject: DateObject | Duration): Datetime {
    if (Duration.isDuration(dateObject)) {
      return new Datetime(this._value.plus(dateObject.value))
    }

    return new Datetime(
      this._value.plus({
        day: dateObject.day,
        year: dateObject.year,
        month: dateObject.month,
        hour: dateObject.hour,
        minute: dateObject.minute,
        second: dateObject.second,
        millisecond: dateObject.millisecond
      })
    )
  }

  difference(datetime: Datetime): Duration {
    const iso8601 = this._value.diff(datetime._value).toISO()
    return Duration.fromIso(iso8601)
  }

  toIso() {
    const date = [this._value.year, this._value.month, this._value.day].map(this.addPadStart)
    const time = [this._value.hour, this._value.minute, this._value.second].map(this.addPadStart)

    return `${date.join('-')}T${time.join(':')}Z`
  }

  toLocal(): Datetime {
    return new Datetime(this._value.toLocal(), true)
  }

  toMillis(): number {
    return this._value.toMillis()
  }

  asLocal() {
    return new Datetime(this._value.setZone('local', { keepLocalTime: true }), true)
  }

  isValid() {
    return this._value.isValid
  }

  set({ year, month, day, hour, minute, second, millisecond }: DateObject): Datetime {
    return new Datetime(
      this._value.set({
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond
      })
    )
  }

  format(value: string, options?: Intl.DateTimeFormatOptions) {
    return this._value.toFormat(value, options)
  }

  equals(datetimeToCompare: Datetime): boolean {
    return +this === +datetimeToCompare
  }

  valueOf() {
    return this.jsDate.getTime()
  }

  toString() {
    return this.toIso()
  }

  private addPadStart(number: number) {
    return number.toString().padStart(2, '0')
  }
}
