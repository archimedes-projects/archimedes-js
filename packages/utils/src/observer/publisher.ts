import { Subscriber } from './subscriber'

export interface Publisher {
  register(subscriber: Subscriber): void
  unregister(subscriber: Subscriber): void
  publish(): void
}
