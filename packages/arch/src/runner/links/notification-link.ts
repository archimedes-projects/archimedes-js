import { BaseLink } from './base-link'
import { Context } from '../context'
import { NotificationCenter } from '../../notifications/notification-center'

export class NotificationLink extends BaseLink {
  constructor(private readonly notificationCenter: NotificationCenter) {
    super()
  }

  async next(context: Context): Promise<void> {
    context.result = context.result?.catch(e => {
      if (!context.executionOptions.inlineError) {
        this.notificationCenter.new({ message: e.error?.message ?? 'Error' })
      }
      console.error(e)
      throw e
    })
    await this.nextLink.next(context)
    return
  }
}
