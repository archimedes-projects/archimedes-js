import { Runner } from '../runner/runner'
import { ExecutionOptions } from './execution-options'

type Fn = () => void
type Id = number

export abstract class UseCase<Return = void, Param = void> {
  abstract readonly: boolean
  abstract internalExecute(param: Param): Promise<Return>
  private static currentId = 0
  private subscriptions = new Map<Id, Fn>()

  subscribe(fn: Fn): Id {
    const id = UseCase.currentId++
    this.subscriptions.set(id, fn)
    return id
  }

  unsubscribe(id: Id) {
    this.subscriptions.delete(id)
  }

  async execute(param: Param, executionOptions: ExecutionOptions = { inlineError: false }): Promise<Return> {
    const value = (await Runner.run(this as any, executionOptions, param)) as Promise<Return>
    this.subscriptions.forEach(x => x())
    return value
  }
}
