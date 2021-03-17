import { BaseLink } from './base-link'
import { Context } from './context'
import { Logger } from './logger'

export class LoggerLink extends BaseLink {
  constructor(private readonly logger: Logger) {
    super()
  }

  next(context: Context): void {
    context.result = context.result?.then(x => {
      this.logger.log(
        `[${context.useCase.constructor.name}] - ${
          context.param !== undefined ? JSON.stringify(context.param, null, 2) : '-'
        } - ${x}`
      )
      return x
    })
    this.nextLink.next(context)
  }
}
