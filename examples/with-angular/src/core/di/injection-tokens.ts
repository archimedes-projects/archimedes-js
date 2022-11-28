import { InjectionToken } from '@angular/core'
import { TodoRepository } from 'src/app/features/todo/domain/todo-repository'

export class InjectionTokens {
  static TODO_REPOSITORY = new InjectionToken<TodoRepository>('TODO_REPOSITORY')
}
