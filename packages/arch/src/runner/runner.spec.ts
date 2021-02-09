import { Runner } from './runner'
import { Link } from './link'
import { anything, instance, mock, verify } from 'ts-mockito'
import { UseCase } from '../use-case/use-case'

describe.skip('Runner', () => {
  it('should run the runner', () => {
    const link = mock<Link>()
    Runner.createChain([link])
    const useCase = mock<UseCase<Promise<unknown>, unknown>>()

    Runner.run(instance(useCase), { inlineError: false })

    verify(link.next(anything())).once()
  })
})
