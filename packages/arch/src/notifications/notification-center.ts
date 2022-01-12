import { Subject, Observer } from '@archimedes/utils'
import { Notification } from './notification'
import { NotificationCenterOptions } from './notification-center-options'

export class NotificationCenter implements Subject {
  observers: Observer[] = []
  notifications: Notification[] = []
  notificationCenterOptions: NotificationCenterOptions

  constructor(notificationOptions?: Partial<NotificationCenterOptions>) {
    this.notificationCenterOptions = {
      notificationTimeout: notificationOptions?.notificationTimeout ?? 5_000
    }
  }

  new(notification: Notification) {
    this.notifications.push(notification)
    this.publish()
    setTimeout(() => {
      this.notifications.pop()
      this.publish()
    }, this.notificationCenterOptions.notificationTimeout)
  }

  publish() {
    this.observers.forEach(x => x.update(this))
  }

  register(observer: Observer) {
    this.observers.push(observer)
  }

  unregister(observer: Observer) {
    this.observers = this.observers.filter(x => x !== observer)
  }
}
