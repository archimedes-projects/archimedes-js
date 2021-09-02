import { Link } from './link'
import { Context } from '../context'

export class EmptyLink implements Link {
  setNext(_link: Link): Link {
    return this
  }

  next(_context: Context) {}
}
