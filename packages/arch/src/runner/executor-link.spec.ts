import { ExecutorLink } from './executor-link'
import { anything, instance, mock, verify, when } from 'ts-mockito'
import { Context } from './context'
import { UseCase } from '../use-case/use-case'
import { Link } from './link'

describe('ExecutorLink', () => {
  it('should execute', () => {
    const { context, nextLink, executorLink } = setup()
    const useCase = mock<UseCase<Promise<unknown>, unknown>>()
    when(context.useCase).thenReturn(instance(useCase))
    when(context.param).thenReturn(undefined)
    executorLink.setNext(instance(nextLink))

    executorLink.next(instance(context))

    verify(useCase.internalExecute(anything())).once()
  })

  it('should call next link', () => {
    const { context, nextLink, executorLink } = setup()
    const useCase = mock<UseCase<Promise<unknown>, unknown>>()
    when(context.useCase).thenReturn(instance(useCase))
    when(context.param).thenReturn(undefined)
    executorLink.setNext(instance(nextLink))

    executorLink.next(instance(context))

    verify(nextLink.next(anything())).once()
  })
})

function setup() {
  const context = mock(Context)
  const nextLink = mock<Link>()
  return {
    context,
    nextLink,
    executorLink: new ExecutorLink()
  }
}
