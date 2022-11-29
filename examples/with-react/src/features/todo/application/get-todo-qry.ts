import { Query, UseCaseKey } from '@archimedes/arch'
import { inject, injectable } from 'tsyringe'
import { InjectionTokens } from '../../../core/di/injection-tokens'
import { Todo } from '../domain/todo'
import type { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('GetTodoQry')
@injectable()
export class GetTodoQry extends Query<Todo | undefined, number> {
  constructor(@inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(id: number): Promise<Todo | undefined> {
    return this.todoRepository.get(id)
  }
}
