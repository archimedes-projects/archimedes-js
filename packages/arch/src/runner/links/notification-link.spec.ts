import { NotificationLink } from './notification-link'
import { deepEqual, instance, mock, verify } from 'ts-mockito'
import { NotificationCenter } from '../../notifications/notification-center'
import { Context } from '../context'
import { Link } from './link'
import { UseCase } from '../../use-case/use-case'

describe.skip('NotificationLink', () => {
  it('should create a new notification when there is an error', async () => {
    expect.assertions(1)
    const { notificationCenter, notificationLink, link } = setup()
    try {
      notificationLink.setNext(instance(link))
      class MockUseCase extends UseCase<unknown, unknown> {
        readonly = true
        internalExecute(): Promise<void> {
          throw new Error('error')
        }
      }
      const mockUseCase = new MockUseCase()
      const context = Context.create({
        useCase: mockUseCase,
        param: undefined,
        executionOptions: { inlineError: false }
      })
      context.result = mockUseCase.internalExecute()

      notificationLink.next(instance(context))
      await context.result
    } catch (e) {
      expect(e).toEqual({
        message: 'error'
      })
      verify(notificationCenter.new(deepEqual({ message: 'error' }))).once()
    }
  })

  it('should call next link', async () => {
    expect.assertions(1)
    const { notificationLink, link } = setup()
    notificationLink.setNext(instance(link))
    class MockUseCase extends UseCase<unknown, unknown> {
      readonly = true
      internalExecute(): Promise<void> {
        throw new Error('error')
      }
    }

    const mockUseCase = new MockUseCase()
    const context = Context.create({
      useCase: mockUseCase,
      param: undefined,
      executionOptions: { inlineError: false }
    })

    context.result = mockUseCase.internalExecute()
    try {
      notificationLink.next(instance(context))
      await context.result
    } catch (e) {
      verify(link.next(deepEqual(context))).once()
    }
  })

  it("should not create a new notification when there is an error an it's configured to inline the error", async () => {
    expect.assertions(1)
    const { notificationLink, link } = setup()
    notificationLink.setNext(instance(link))
    class MockUseCase extends UseCase<unknown, unknown> {
      readonly = true
      internalExecute(): Promise<void> {
        throw new Error('error')
      }
    }

    const mockUseCase = new MockUseCase()
    const context = Context.create({
      useCase: mockUseCase,
      param: undefined,
      executionOptions: { inlineError: true }
    })

    context.result = mockUseCase.internalExecute()
    try {
      notificationLink.next(instance(context))
      await context.result
    } catch (e) {
      verify(link.next(deepEqual(context))).never()
    }
  })
})

function setup() {
  const notificationCenter = mock(NotificationCenter)
  const link = mock<Link>()

  return {
    link,
    notificationCenter,
    notificationLink: new NotificationLink(instance(notificationCenter))
  }
}
