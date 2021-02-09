export class ExtendedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    if (typeof (Error as any).captureStackTrace === 'function') {
      ;(Error as any).captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}
