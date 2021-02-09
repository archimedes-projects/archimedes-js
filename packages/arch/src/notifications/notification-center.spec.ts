import { NotificationCenter } from './notification-center'
import { Publisher } from '@archimedes/utils'

describe('NotificationCenter', () => {
  it('should create a notification', () => {
    jest.useFakeTimers()
    const notificationCenter = new NotificationCenter()

    notificationCenter.new({ message: 'foo' })

    expect(notificationCenter.notifications).toEqual([{ message: 'foo' }])
  })

  it('should register a subscriber', () => {
    const notificationCenter = new NotificationCenter()

    notificationCenter.register({ update(_publisher: Publisher) {} })

    expect(notificationCenter.subscribers).toHaveLength(1)
  })

  it('should unregister a subscriber', () => {
    const notificationCenter = new NotificationCenter()
    const subscriber = { update(_publisher: Publisher) {} }
    notificationCenter.register(subscriber)

    notificationCenter.unregister(subscriber)

    expect(notificationCenter.subscribers).toHaveLength(0)
  })

  it('should publish', () => {
    const notificationCenter = new NotificationCenter()
    let count = 0
    const subscriber = {
      update(_publisher: Publisher) {
        count++
      }
    }
    notificationCenter.register(subscriber)

    notificationCenter.publish()

    expect(count).toBe(1)
  })
})
