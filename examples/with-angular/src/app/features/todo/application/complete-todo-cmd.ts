import { Inject, Injectable } from '@angular/core'
import { Command, UseCaseKey } from '@archimedes/arch'
import { InjectionTokens } from 'src/core/di/injection-tokens'
import { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('CompleteTodoCmd')
@Injectable({
  providedIn: 'root'
})
export class CompleteTodoCmd extends Command<{ id: number; isCompleted: boolean }> {
  constructor(@Inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute({ id, isCompleted }: { id: number; isCompleted: boolean }): Promise<void> {
    return this.todoRepository.update(id, { completed: isCompleted })
  }
}
