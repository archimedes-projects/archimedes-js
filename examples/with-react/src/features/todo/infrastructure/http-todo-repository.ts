import { NewTodo } from '../domain/new-todo'
import { Todo } from '../domain/todo'
import { TodoRepository } from '../domain/todo-repository'
import { injectable } from 'tsyringe'

@injectable()
export class HttpTodoRepository implements TodoRepository {
  private static TODO_URL = 'https://jsonplaceholder.typicode.com/todos'
  private static TODO_BY_ID_URL = (id: number) => `${HttpTodoRepository.TODO_URL}/${id}`

  constructor() {}
  async get(id: number): Promise<Todo | undefined> {
    const response = await fetch(HttpTodoRepository.TODO_BY_ID_URL(id))
    return response.json()
  }

  async getAll(): Promise<Todo[]> {
    const response = await fetch(HttpTodoRepository.TODO_URL)
    return response.json()
  }

  async create(newTodo: NewTodo): Promise<void> {
    await fetch(HttpTodoRepository.TODO_URL, { method: 'POST', body: JSON.stringify(newTodo) })
  }

  async update(id: number, todo: Partial<Todo>): Promise<void> {
    await fetch(HttpTodoRepository.TODO_BY_ID_URL(id), { method: 'PATCH', body: JSON.stringify(todo) })
  }
}
