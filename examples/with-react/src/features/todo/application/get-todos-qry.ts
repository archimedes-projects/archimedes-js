import { InvalidateCache, Query, UseCaseKey } from '@archimedes/arch'
import { inject, injectable } from 'tsyringe'
import { InjectionTokens } from '../../../core/di/injection-tokens'
import { Todo } from '../domain/todo'
import type { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('GetTodosQry')
@InvalidateCache
@injectable()
export class GetTodosQry extends Query<Todo[]> {
  constructor(@inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(): Promise<Todo[]> {
    return this.todoRepository.getAll()
  }
}
