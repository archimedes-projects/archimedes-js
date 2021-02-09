import { Publisher, Subscriber } from '@archimedes/utils'
import { Notification } from './notification'

export class NotificationCenter implements Publisher {
  subscribers: Subscriber[] = []
  notifications: Notification[] = []

  new(notification: Notification) {
    this.notifications.push(notification)
    this.publish()
    window.setTimeout(() => {
      this.notifications.pop()
      this.publish()
    }, 5_000)
  }

  publish() {
    this.subscribers.forEach(x => x.update(this))
  }

  register(subscriber: Subscriber) {
    this.subscribers.push(subscriber)
  }

  unregister(subscriber: Subscriber) {
    this.subscribers = this.subscribers.filter(x => x !== subscriber)
  }
}
