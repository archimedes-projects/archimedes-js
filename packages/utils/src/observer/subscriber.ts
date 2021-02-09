import { Publisher } from './publisher'

export interface Subscriber {
  update(publisher: Publisher): void
}
