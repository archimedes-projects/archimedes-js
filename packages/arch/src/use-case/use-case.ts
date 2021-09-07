import { Runner } from '../runner/runner'
import { ExecutionOptions } from './execution-options'

type Fn<Result, Param> = (params: { result: Result; param: Param; executionOptions: ExecutionOptions }) => void
type Id = number

export abstract class UseCase<Result = void, Param = void> {
  abstract readonly: boolean
  abstract internalExecute(param: Param): Promise<Result>
  private static currentId = 0
  private subscriptions = new Map<Id, Fn<Result, Param>>()

  subscribe(fn: Fn<Result, Param>): Id {
    const id = UseCase.currentId++
    this.subscriptions.set(id, fn)
    return id
  }

  unsubscribe(id: Id) {
    this.subscriptions.delete(id)
  }

  async execute(param: Param, executionOptions: ExecutionOptions = { inlineError: false }): Promise<Result> {
    const value = (await Runner.run(this as any, executionOptions, param)) as Result
    this.subscriptions.forEach(x => x({ result: value, param, executionOptions }))
    return value
  }
}
