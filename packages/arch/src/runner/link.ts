import { Context } from './context'

export interface Link {
  setNext(link: Link): Link
  next(context: Context): void
}
