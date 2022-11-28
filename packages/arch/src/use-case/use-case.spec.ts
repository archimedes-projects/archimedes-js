import { UseCase } from './use-case'
import { Runner } from '../runner/runner'
import { ExecutionOptions } from './execution-options'

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

    expect(Runner.run).toBeCalledWith(mockUseCase, { inlineError: false, invalidateCache: false }, 42)
  })

  it('should subscribe', async () => {
    class MockUseCase extends UseCase {
      readonly = false

      async internalExecute() {}
    }

    const mockUseCase = new MockUseCase()
    let called = false

    mockUseCase.subscribe(() => (called = true))
    await mockUseCase.execute()

    expect(called).toBe(true)
  })

  it('should be able to subscribe to multiple executions', async () => {
    class MockUseCase extends UseCase {
      readonly = false

      async internalExecute() {}
    }

    const mockUseCase = new MockUseCase()
    let calls = 0

    mockUseCase.subscribe(() => calls++)
    await mockUseCase.execute()
    await mockUseCase.execute()
    await mockUseCase.execute()

    expect(calls).toBe(3)
  })

  it('should be able to unsubscribe', async () => {
    class MockUseCase extends UseCase {
      readonly = false

      async internalExecute() {}
    }

    const mockUseCase = new MockUseCase()
    let calls = 0

    const id = mockUseCase.subscribe(() => calls++)
    await mockUseCase.execute()
    mockUseCase.unsubscribe(id)
    await mockUseCase.execute()

    expect(calls).toBe(1)
  })

  it('should be able execute with more than one executions options', async () => {
    class MockUseCase extends UseCase {
      readonly = false
      async internalExecute(): Promise<void> {}
    }
    const mockUseCase = new MockUseCase()

    mockUseCase.execute(undefined, { foo: 'bar' } as ExecutionOptions & { foo: string })

    expect(Runner.run).toBeCalledWith(
      mockUseCase,
      { inlineError: false, invalidateCache: false, foo: 'bar' },
      undefined
    )
  })
})
