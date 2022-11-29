import { Command, UseCaseKey } from '@archimedes/arch'
import { inject, injectable } from 'tsyringe'
import { InjectionTokens } from '../../../core/di/injection-tokens'
import { NewTodo } from '../domain/new-todo'
import type { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('CreateTodoCmd')
@injectable()
export class CreateTodoCmd extends Command<NewTodo> {
  constructor(@inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(newTodo: NewTodo): Promise<void> {
    return this.todoRepository.create(newTodo)
  }
}
