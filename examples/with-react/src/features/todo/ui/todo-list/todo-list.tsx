import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDi } from '../../../../use-di'
import { CompleteTodoCmd } from '../../application/complete-todo-cmd'
import { GetTodosQry } from '../../application/get-todos-qry'
import { Todo } from '../../domain/todo'

import styles from './todo-list.module.css'

export const TodoList: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const getTodosQry = useDi(GetTodosQry)
  const completeTodoCmd = useDi(CompleteTodoCmd)

  async function getTodos(refresh = false) {
    const newTodos = await getTodosQry.execute(undefined, { invalidateCache: refresh })
    setTodos(newTodos)
  }

  useEffect(() => {
    getTodos()
    const id = completeTodoCmd.subscribe(() => getTodos())
    return () => completeTodoCmd.unsubscribe(id)
  }, [])

  const completeTodo = async (todo: Todo) => {
    await completeTodoCmd.execute({ id: todo.id, isCompleted: !todo.completed })
  }

  return (
    <div className={styles['container']}>
      <h2>TODO LIST</h2>

      <div className={styles['actions']}>
        <Link to="/create">Create</Link>
        <button onClick={() => getTodos(true)}>Refresh</button>
      </div>
      <section>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <button
                className={`${styles['todo']} ${todo.completed ? styles['completed'] : ''}`}
                tabIndex={0}
                onClick={() => completeTodo(todo)}
              >
                <span>{todo.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
