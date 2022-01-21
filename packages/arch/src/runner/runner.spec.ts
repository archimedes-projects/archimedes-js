import { Runner } from './runner'
import { Link } from './links/link'
import { anything, instance, mock, verify } from 'ts-mockito'
import { UseCase } from '../use-case/use-case'

describe('Runner', () => {
  it('should run the runner', async () => {
    const link = mock<Link>()
    Runner.createChain([instance(link)])
    const useCase = mock<UseCase<unknown, unknown>>()

    await Runner.run(instance(useCase), { inlineError: false })

    verify(link.next(anything())).once()
  })
})
