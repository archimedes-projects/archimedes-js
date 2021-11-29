import { BaseLink } from './base-link'
import { Context } from '../context'

export class ExecutorLink extends BaseLink {
  async next(context: Context): Promise<void> {
    context.result = context.useCase.internalExecute(context.param)
    this.nextLink.next(context)
  }
}
