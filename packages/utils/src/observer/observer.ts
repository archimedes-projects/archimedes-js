import { Subject } from './subject'

export interface Observer {
  update(subject: Subject): void
}
