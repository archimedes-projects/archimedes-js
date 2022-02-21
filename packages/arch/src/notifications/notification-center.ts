import { Subject, Observer, Timer } from '@archimedes/utils'
import { Notification } from './notification'
import { NotificationCenterOptions } from './notification-center-options'

export class NotificationCenter implements Subject {
  observers: Observer[] = []
  notifications: Notification[] = []
  notificationCenterOptions: NotificationCenterOptions
  timer?: Timer

  constructor(notificationOptions?: Partial<NotificationCenterOptions>) {
    this.notificationCenterOptions = {
      notificationTimeout: notificationOptions?.notificationTimeout ?? 5_000
    }
  }

  new(notification: Notification) {
    this.notifications.push(notification)
    this.publish()
    this.timer = Timer.create(() => {
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

  pause() {
    this.timer?.pause()
  }

  resume() {
    this.timer?.resume()
  }

  close(index: number) {
    this.notifications.splice(index, 1)
    this.publish()
  }
}
