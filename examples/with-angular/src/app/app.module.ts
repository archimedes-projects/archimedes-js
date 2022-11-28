import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CacheInvalidations, InvalidationPolicy } from '@archimedes/arch'
import { ArchimedesModule } from 'src/core/archimedes/archimedes.module'
import { ContainerModule } from 'src/core/di/container.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CompleteTodoCmd } from './features/todo/application/complete-todo-cmd'
import { CreateTodoCmd } from './features/todo/application/create-todo-cmd'
import { GetTodosQry } from './features/todo/application/get-todos-qry'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ArchimedesModule, ContainerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    CacheInvalidations.set(CreateTodoCmd.prototype.key, [InvalidationPolicy.ALL])
    CacheInvalidations.set(CompleteTodoCmd.prototype.key, [GetTodosQry.prototype.key])
  }
}
