import { BaseLink } from './base-link'
import { Context } from '../context'
import { Logger } from '../logger'
import { Datetime } from '@archimedes/utils'

export class LoggerLink extends BaseLink {
  constructor(private readonly logger: Logger) {
    super()
  }

  next(context: Context): void {
    context.result = context.result?.then(x => {
      this.logger.log(
        `[${Datetime.now().toIso()}] ${context.useCase.constructor.name} / Params: ${
          context.param !== undefined ? this.formatObject(context.param) : ''
        } - Result: ${this.formatObject(x)}`
      )
      return x
    })
    this.nextLink.next(context)
  }

  private formatObject(object: unknown) {
    return JSON.stringify(object, null, 2)
  }
}
