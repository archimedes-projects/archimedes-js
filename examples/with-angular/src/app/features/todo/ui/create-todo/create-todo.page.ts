import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CreateTodoCmd } from '../../application/create-todo-cmd'

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.css']
})
export class CreateTodoPage {
  title: string = ''

  constructor(private readonly router: Router, private readonly createTodoCmd: CreateTodoCmd) {}

  async saveTodo() {
    await this.createTodoCmd.execute({ title: this.title, completed: false })
    this.router.navigateByUrl('/')
  }
}
