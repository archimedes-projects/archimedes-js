import { Runner } from '../runner/runner'
import { ExecutionOptions } from './execution-options'

export abstract class UseCase<Return = void, Param = void> {
  abstract readonly: boolean
  abstract internalExecute(param: Param): Promise<Return>

  execute(param: Param, executionOptions: ExecutionOptions = { inlineError: false }): Promise<Return> {
    return Runner.run(this as any, executionOptions, param) as Promise<Return>
  }
}
