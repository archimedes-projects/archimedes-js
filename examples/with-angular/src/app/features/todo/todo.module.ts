import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CreateTodoPage } from './ui/create-todo/create-todo.page'
import { TodoListPage } from './ui/todo-list/todo-list.page'

@NgModule({
  declarations: [TodoListPage, CreateTodoPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoListPage
      },
      {
        path: 'create',
        component: CreateTodoPage
      }
    ])
  ]
})
export class TodoModule {}
