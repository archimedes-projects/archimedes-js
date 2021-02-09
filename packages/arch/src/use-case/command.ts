import { UseCase } from './use-case'

export abstract class Command<Param = void, Result = void> extends UseCase<Result, Param> {
  readonly = false
}
