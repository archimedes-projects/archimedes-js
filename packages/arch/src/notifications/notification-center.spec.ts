import { NotificationCenter } from './notification-center'
import { Subject, Timer } from '@archimedes/utils'

jest.mock('@archimedes/utils', () => {
  return {
    Subject: jest.fn(),
    Timer: {
      create: jest.fn()
    }
  }
})

describe('NotificationCenter', () => {
  it('should create a notification', () => {
    jest.useFakeTimers()
    const notificationCenter = new NotificationCenter()

    notificationCenter.new({ message: 'foo' })

    expect(notificationCenter.notifications).toEqual([{ message: 'foo' }])
  })

  it('should register a subscriber', () => {
    const notificationCenter = new NotificationCenter()

    notificationCenter.register({ update(_subject: Subject) {} })

    expect(notificationCenter.observers).toHaveLength(1)
  })

  it('should unregister a subscriber', () => {
    const notificationCenter = new NotificationCenter()
    const subscriber = { update(_subject: Subject) {} }
    notificationCenter.register(subscriber)

    notificationCenter.unregister(subscriber)

    expect(notificationCenter.observers).toHaveLength(0)
  })

  it('should publish', () => {
    const notificationCenter = new NotificationCenter()
    let count = 0
    const subscriber = {
      update(_subject: Subject) {
        count++
      }
    }
    notificationCenter.register(subscriber)

    notificationCenter.publish()

    expect(count).toBe(1)
  })

  it('should set new timeout', () => {
    const notificationTimeout = 10_000
    const notificationCenter = new NotificationCenter({ notificationTimeout })

    expect(notificationCenter.notificationCenterOptions.notificationTimeout).toBe(notificationTimeout)
  })

  it('should use the timeout configured when setTimeout is called', () => {
    const notificationTimeout = 10_000
    const notificationCenter = new NotificationCenter({ notificationTimeout })
    notificationCenter.new({ message: 'foo' })

    expect(Timer.create).toHaveBeenCalledTimes(1)
    expect(Timer.create).toHaveBeenCalledWith(expect.any(Function), notificationTimeout)
  })

  it('should pause the timeout', () => {
    const notificationCenter = new NotificationCenter()

    notificationCenter.new({ message: 'foo' })
    notificationCenter.timer = {
      pause: jest.fn()
    }
    notificationCenter.pause()

    expect(notificationCenter.timer.pause).toHaveBeenCalledTimes(1)
  })

  it('should resume the timeout', () => {
    const notificationCenter = new NotificationCenter()

    notificationCenter.new({ message: 'foo' })
    notificationCenter.timer = {
      resume: jest.fn()
    }
    notificationCenter.resume()

    expect(notificationCenter.timer.resume).toHaveBeenCalledTimes(1)
  })

  it('should remove the notification closed and publish the changes', () => {
    const notificationCenter = new NotificationCenter()
    const fooNotification = { message: 'foo' }
    const barNotification = { message: 'bar' }
    const bazNotification = { message: 'baz' }
    const publishSpy = jest.spyOn(notificationCenter, 'publish')

    notificationCenter.notifications = [fooNotification, barNotification, bazNotification]
    notificationCenter.close(1)

    expect(notificationCenter.notifications.length).toBe(2)
    expect(notificationCenter.notifications).toEqual([fooNotification, bazNotification])
    expect(publishSpy).toHaveBeenCalledTimes(1)
  })
})
