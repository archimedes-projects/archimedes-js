import { Subject, Observer } from '@archimedes/utils'
import { Notification } from './notification'

export class NotificationCenter implements Subject {
  observers: Observer[] = []
  notifications: Notification[] = []

  new(notification: Notification) {
    this.notifications.push(notification)
    this.publish()
    setTimeout(() => {
      this.notifications.pop()
      this.publish()
    }, 5_000)
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
