import { Link } from './runner/links/link'
import { Runner } from './runner/runner'

export class Archimedes {
  static createChain(links: Link[]) {
    Runner.createChain(links)
    return this
  }
}
