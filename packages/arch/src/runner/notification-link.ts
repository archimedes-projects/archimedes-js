import { BaseLink } from './base-link'
import { Context } from './context'
import { NotificationCenter } from '../notifications/notification-center'

export class NotificationLink extends BaseLink {
  constructor(private readonly notificationCenter: NotificationCenter) {
    super()
  }

  next(context: Context): void {
    context.result = context.result?.catch(e => {
      if (!context.executionOptions.inlineError) {
        this.notificationCenter.new({ message: e.error?.message ?? 'Error' })
      }
      console.error(e)
      throw e
    })
    this.nextLink.next(context)
  }
}
