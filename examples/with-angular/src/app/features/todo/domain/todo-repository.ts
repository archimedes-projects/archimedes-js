import { NewTodo } from './new-todo'
import { Todo } from './todo'

export interface TodoRepository {
  getAll(): Promise<Todo[]>
  get(id: number): Promise<Todo | undefined>
  create(newTodo: NewTodo): Promise<void>
  update(id: number, todo: Partial<Todo>): Promise<void>
}
