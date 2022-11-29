import { Todo } from './todo'

export type NewTodo = Omit<Todo, 'id'>
