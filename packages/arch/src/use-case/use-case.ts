import { CacheKey } from '../cache/cache-key'
import { USE_CASE_KEY } from '../cache/use-case-key'
import { Runner } from '../runner/runner'
import { ExecutionOptions } from './execution-options'

type Fn<Result, Param> = (params: { result: Result; param: Param; executionOptions: ExecutionOptions }) => void
type Id = number

export abstract class UseCase<Result = void, Param = void> {
  abstract readonly: boolean
  abstract internalExecute(param: Param): Promise<Result>
  private static currentId = 0
  private subscriptions = new Map<Id, Fn<Result, Param>>()

  get key(): CacheKey {
    return (
      this.constructor.prototype?.[USE_CASE_KEY] ?? this.constructor.prototype?.[USE_CASE_KEY] ?? this.constructor.name
    )
  }

  subscribe(fn: Fn<Result, Param>): Id {
    const id = UseCase.currentId++
    this.subscriptions.set(id, fn)
    return id
  }

  unsubscribe(id: Id) {
    this.subscriptions.delete(id)
  }

  async execute(param: Param, executionOptions?: Partial<ExecutionOptions>): Promise<Result> {
    const options: ExecutionOptions = { inlineError: false, ...executionOptions }
    const value = (await Runner.run(this as any, options, param)) as Result
    this.subscriptions.forEach(x => x({ result: value, param, executionOptions: options }))
    return value
  }
}
