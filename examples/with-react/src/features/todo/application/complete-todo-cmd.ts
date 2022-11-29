import { Command, UseCaseKey } from '@archimedes/arch'
import { inject, injectable } from 'tsyringe'
import { InjectionTokens } from '../../../core/di/injection-tokens'
import type { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('CompleteTodoCmd')
@injectable()
export class CompleteTodoCmd extends Command<{ id: number; isCompleted: boolean }> {
  constructor(@inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute({ id, isCompleted }: { id: number; isCompleted: boolean }): Promise<void> {
    return this.todoRepository.update(id, { completed: isCompleted })
  }
}
