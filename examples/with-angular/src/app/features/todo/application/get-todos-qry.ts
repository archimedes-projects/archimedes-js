import { Inject, Injectable } from '@angular/core'
import { InvalidateCache, Query, UseCaseKey } from '@archimedes/arch'
import { InjectionTokens } from 'src/core/di/injection-tokens'
import { Todo } from '../domain/todo'
import { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('GetTodosQry')
@InvalidateCache
@Injectable({
  providedIn: 'root'
})
export class GetTodosQry extends Query<Todo[]> {
  constructor(@Inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(): Promise<Todo[]> {
    return this.todoRepository.getAll()
  }
}
