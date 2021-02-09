import { UseCase } from './use-case'

export abstract class Query<Result = void, Param = void> extends UseCase<Result, Param> {
  readonly = true
}
