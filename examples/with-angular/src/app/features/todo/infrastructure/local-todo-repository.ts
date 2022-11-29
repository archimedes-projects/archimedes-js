import { Injectable } from '@angular/core'
import { NewTodo } from '../domain/new-todo'
import { Todo } from '../domain/todo'
import { TodoRepository } from '../domain/todo-repository'

@Injectable({
  providedIn: 'root'
})
export class LocalTodoRepository implements TodoRepository {
  private readonly todos = new Map<number, Todo>()

  async getAll(): Promise<Todo[]> {
    return Array.from(this.todos.values())
  }

  async get(id: number): Promise<Todo | undefined> {
    return this.todos.get(id)
  }

  async create(newTodo: NewTodo): Promise<void> {
    const newId = this.todos.size + 1
    this.todos.set(newId, { ...newTodo, id: newId })
  }

  async update(id: number, todo: Partial<Todo>): Promise<void> {
    const previousTodo = this.todos.get(id)
    this.todos.set(id, { ...previousTodo, ...todo } as Todo)
  }
}
