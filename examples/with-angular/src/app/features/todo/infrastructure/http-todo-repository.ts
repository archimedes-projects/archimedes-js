import { Injectable } from '@angular/core'
import { NewTodo } from '../domain/new-todo'
import { Todo } from '../domain/todo'
import { TodoRepository } from '../domain/todo-repository'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpTodoRepository implements TodoRepository {
  private static TODO_URL = 'https://jsonplaceholder.typicode.com/todos'
  private static TODO_BY_ID_URL = (id: number) => `${HttpTodoRepository.TODO_URL}/${id}`

  constructor(private readonly httpClient: HttpClient) {}
  get(id: number): Promise<Todo | undefined> {
    return this.httpClient.get<Todo>(HttpTodoRepository.TODO_BY_ID_URL(id)).toPromise()
  }

  async getAll(): Promise<Todo[]> {
    const todos = await this.httpClient.get<Todo[]>(HttpTodoRepository.TODO_URL).toPromise()
    return todos ?? []
  }

  async create(newTodo: NewTodo): Promise<void> {
    await this.httpClient.post(HttpTodoRepository.TODO_URL, newTodo).toPromise()
  }

  async update(id: number, todo: Partial<Todo>): Promise<void> {
    await this.httpClient.patch(HttpTodoRepository.TODO_BY_ID_URL(id), todo).toPromise()
  }
}
