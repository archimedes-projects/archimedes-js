import { Route, Routes } from 'react-router-dom'
import styles from './app.module.css'
import { CreateTodo } from './features/todo/ui/create-todo/create-todo'
import { TodoList } from './features/todo/ui/todo-list/todo-list'

function App() {
  return (
    <div>
      <div className={styles['toolbar']} role="banner">
        <div className={styles['spacer']}></div>
        <span>ARCHIMEDES WITH REACT</span>
        <div className={styles['spacer']}></div>
      </div>

      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<CreateTodo />} />
      </Routes>
    </div>
  )
}

export default App
