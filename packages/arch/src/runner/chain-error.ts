import { ExtendedError } from '@archimedes/utils'

export class ChainError extends ExtendedError {
  constructor() {
    super('The chain of responsibility has not been created. Use createChain first and then run the use case again.')
  }
}
