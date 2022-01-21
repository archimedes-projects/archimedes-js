import { Context } from '../context'
import { ChainError } from '../chain-error'
import { BaseLink } from './base-link'

export class NullLink extends BaseLink {
  async next(_context: Context) {
    throw new ChainError()
  }
}
