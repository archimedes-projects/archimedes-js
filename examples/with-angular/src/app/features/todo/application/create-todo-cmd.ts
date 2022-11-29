import { Inject, Injectable } from '@angular/core'
import { Command, UseCaseKey } from '@archimedes/arch'
import { InjectionTokens } from 'src/core/di/injection-tokens'
import { NewTodo } from '../domain/new-todo'
import { TodoRepository } from '../domain/todo-repository'

@UseCaseKey('CreateTodoCmd')
@Injectable({
  providedIn: 'root'
})
export class CreateTodoCmd extends Command<NewTodo> {
  constructor(@Inject(InjectionTokens.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(newTodo: NewTodo): Promise<void> {
    return this.todoRepository.create(newTodo)
  }
}
