import { Observer } from './observer'

export interface Subject {
  observers: Observer[]
  register(observer: Observer): void
  unregister(observer: Observer): void
  publish(): void
}
