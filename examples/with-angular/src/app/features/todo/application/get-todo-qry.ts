import { Inject, Injectable } from '@angular/core'

import { Query, UseCaseKey } from '@archimedes/arch'
import { InjectionTokens } from 'src/core/di/injection-tokens'
import { Todo } from '../domain/todo'
import { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('GetTodoQry')
@Injectable({
  providedIn: 'root'
})
export class GetTodoQry extends Query<Todo | undefined, number> {
  constructor(@Inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(id: number): Promise<Todo | undefined> {
    return this.todoRepository.get(id)
  }
}
