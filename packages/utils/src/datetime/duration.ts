import { Duration as LuxonDuration } from 'luxon'
import { Timestamp } from './timestamp'
import { TimeUnits } from './time-units'

export class Duration {
  private constructor(public readonly value: LuxonDuration) {}

  static fromTimeStamp(timestamp: Timestamp) {
    const [hours, minutes, seconds, milliseconds] = timestamp.split(':').map(Number)
    return new Duration(LuxonDuration.fromObject({ hours, minutes, seconds, milliseconds }))
  }

  static isDuration(obj: any): obj is Duration {
    return LuxonDuration.isDuration(obj?.value)
  }

  static fromIso(iso8601: string) {
    return new Duration(LuxonDuration.fromISO(iso8601))
  }

  get years(): number {
    return this.value.years
  }

  get months(): number {
    return this.value.months
  }

  get days(): number {
    return this.value.days
  }

  get hours(): number {
    return this.value.hours
  }

  get minutes(): number {
    return this.value.minutes
  }

  get seconds(): number {
    return this.value.seconds
  }

  get milliseconds(): number {
    return this.value.milliseconds
  }

  as(timeUnits: TimeUnits) {
    return this.value.as(timeUnits)
  }

  toIso() {
    return this.value.toISO()
  }
}
