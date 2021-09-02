import { Context } from './context'
import { UseCase } from '../use-case/use-case'
import { Link } from './links/link'
import { ExecutionOptions } from '../use-case/execution-options'
import { NullLink } from './links/null-link'

export class Runner {
  private static chain: Link = new NullLink()

  static run(useCase: UseCase<Promise<unknown>>, executionOptions: ExecutionOptions, param?: unknown): unknown {
    const context = Context.create({ useCase, param, executionOptions })
    this.chain.next(context)
    return context.result
  }

  static createChain(links: Link[]) {
    this.chain = links[0] ?? new NullLink()
    links.forEach((link, i) => {
      const isNotLastLink = i + 1 !== links.length
      if (isNotLastLink) {
        link.setNext(links[i + 1])
      }
    })
  }
}
