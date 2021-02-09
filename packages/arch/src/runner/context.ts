import { UseCase } from '../use-case/use-case'
import { ExecutionOptions } from '../use-case/execution-options'

export class Context {
  result?: Promise<unknown>

  private constructor(
    public useCase: UseCase<unknown, unknown>,
    readonly executionOptions: ExecutionOptions,
    readonly param?: unknown
  ) {}

  static create({
    useCase,
    param,
    executionOptions
  }: {
    useCase: UseCase<unknown, unknown>
    param?: unknown
    executionOptions: ExecutionOptions
  }) {
    return new Context(useCase, executionOptions, param)
  }
}
