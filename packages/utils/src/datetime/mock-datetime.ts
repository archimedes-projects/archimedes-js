import { Settings } from 'luxon'
import { Datetime } from './datetime'

export class MockDatetime {
  private static ORIGINAL_NOW = Settings.now

  static mock(date: Datetime) {
    Settings.now = () => date.jsDate.valueOf()
  }

  static reset() {
    Settings.now = MockDatetime.ORIGINAL_NOW
  }

  static mockTimezone(timeZone: string) {
    Settings.defaultZoneName = timeZone
  }

  static resetMockTimezone() {
    Settings.defaultZoneName = 'utc'
  }
}
