import { container } from 'tsyringe'
import { LocalTodoRepository } from '../../features/todo/infrastructure/local-todo-repository'
import { InjectionTokens } from './injection-tokens'

container.registerSingleton(InjectionTokens.TODO_REPOSITORY, LocalTodoRepository)

export { container }
