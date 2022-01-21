import { NotificationCenter } from './notification-center'
import { Subject } from '@archimedes/utils'

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
    jest.spyOn(global, 'setTimeout')

    notificationCenter.new({ message: 'foo' })

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), notificationTimeout)
  })
})
