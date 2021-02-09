import { EmptyLink } from './empty-link'
import { Context } from './context'
import { Link } from './link'

export abstract class BaseLink {
  nextLink: Link = new EmptyLink()

  setNext(link: Link): Link {
    this.nextLink = link
    return this
  }

  abstract next(context: Context): void
}
