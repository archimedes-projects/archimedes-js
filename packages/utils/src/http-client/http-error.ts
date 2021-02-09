import { ExtendedError } from '../extended-error/extended-error'

export class HttpError extends ExtendedError {
  constructor() {
    super('HTTP Error')
  }
}
