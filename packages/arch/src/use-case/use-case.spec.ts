import { UseCase } from './use-case'
import { Runner } from '../runner/runner'

jest.mock('../runner/runner')

describe('UseCase', () => {
  it('should execute use case using runner', () => {
    class MockUseCase extends UseCase<number, number> {
      readonly = false
      async internalExecute(value: number): Promise<number> {
        return value
      }
    }
    const mockUseCase = new MockUseCase()

    mockUseCase.execute(42)

    expect(Runner.run).toBeCalledWith(mockUseCase, { inlineError: false }, 42)
  })
})
