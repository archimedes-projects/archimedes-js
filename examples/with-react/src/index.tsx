import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  Archimedes,
  CacheInvalidations,
  CacheLink,
  CacheManager,
  ExecutorLink,
  InvalidationPolicy,
  LoggerLink
} from '@archimedes/arch'
import { BrowserRouter } from 'react-router-dom'
import { CreateTodoCmd } from './features/todo/application/create-todo-cmd'
import { CompleteTodoCmd } from './features/todo/application/complete-todo-cmd'
import { GetTodosQry } from './features/todo/application/get-todos-qry'

CacheInvalidations.set(CreateTodoCmd.prototype.key, [InvalidationPolicy.ALL])
CacheInvalidations.set(CompleteTodoCmd.prototype.key, [GetTodosQry.prototype.key])

Archimedes.createChain([new CacheLink(new CacheManager()), new ExecutorLink(), new LoggerLink(console)])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
