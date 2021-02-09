import { Duration as LuxonDuration } from 'luxon'
import { Timestamp } from './timestamp'

export class Duration {
  private constructor(public readonly value: LuxonDuration) {}

  static fromTimeStamp(timestamp: Timestamp) {
    const [hours, minutes, seconds, milliseconds] = timestamp.split(':').map(Number)
    return new Duration(LuxonDuration.fromObject({ hours, minutes, seconds, milliseconds }))
  }

  static isDuration(obj: any): obj is Duration {
    return LuxonDuration.isDuration(obj?.value)
  }

  toIso() {
    return this.value.toISO()
  }
}
