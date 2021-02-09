import { BaseLink } from './base-link'
import { Context } from './context'

export class LoggerLink extends BaseLink {
  next(context: Context): void {
    context.result = context.result?.then(x => {
      console.group(context.useCase.constructor.name)
      console.info(`Parameters: ${context.param !== undefined ? JSON.stringify(context.param, null, 2) : '-'}`)
      console.info(`Result:`)
      console.log(x)
      console.groupEnd()
      return x
    })
    this.nextLink.next(context)
  }
}
