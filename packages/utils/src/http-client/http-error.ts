import { ExtendedError } from '../extended-error/extended-error'

export class HttpError extends ExtendedError {
  constructor({ name, message }: { name: string; message: string }) {
    super(`HTTP Error ${name}: ${message}`)
  }
}
