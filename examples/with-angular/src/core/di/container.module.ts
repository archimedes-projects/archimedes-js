import { NgModule } from '@angular/core'
import { LocalTodoRepository } from 'src/app/features/todo/infrastructure/local-todo-repository'
import { InjectionTokens } from './injection-tokens'

@NgModule({
  providers: [
    {
      provide: InjectionTokens.TODO_REPOSITORY,
      useClass: LocalTodoRepository
    }
  ]
})
export class ContainerModule {}
