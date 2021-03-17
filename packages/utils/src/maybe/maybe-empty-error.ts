import { ExtendedError } from '../extended-error/extended-error'

export class MaybeEmptyError extends ExtendedError {
  constructor() {
    super('Maybe is empty')
  }
}
