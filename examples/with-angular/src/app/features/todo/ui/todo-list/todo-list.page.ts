import { Component, OnDestroy, OnInit } from '@angular/core'
import { CompleteTodoCmd } from '../../application/complete-todo-cmd'
import { GetTodosQry } from '../../application/get-todos-qry'
import { Todo } from '../../domain/todo'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.css']
})
export class TodoListPage implements OnInit, OnDestroy {
  private completeSubscriptionId!: number

  todos: Todo[] = []

  constructor(private readonly getTodosQry: GetTodosQry, private readonly completeTodoCmd: CompleteTodoCmd) {}

  async ngOnInit(): Promise<void> {
    this.todos = await this.getTodosQry.execute()
    this.completeSubscriptionId = this.completeTodoCmd.subscribe(async () => {
      this.todos = await this.getTodosQry.execute()
    })
  }

  ngOnDestroy(): void {
    this.completeTodoCmd.unsubscribe(this.completeSubscriptionId)
  }

  async completeTodo(todo: Todo) {
    await this.completeTodoCmd.execute({ id: todo.id, isCompleted: !todo.completed })
  }
}
