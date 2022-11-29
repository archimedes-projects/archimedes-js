import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDi } from '../../../../use-di'
import { CreateTodoCmd } from '../../application/create-todo-cmd'
import styles from './create-todo.module.css'

export const CreateTodo: FC = () => {
  const [title, setTitle] = useState('')
  const createTodoCmd = useDi(CreateTodoCmd)
  const navigate = useNavigate()

  const saveTodo = async () => {
    await createTodoCmd.execute({
      title,
      completed: false
    })
    navigate('/')
  }

  return (
    <div className={styles['container']}>
      <h2>CREATE TODO</h2>

      <label>
        Title
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>

      <div className={styles['actions']}>
        <Link to="/">Back</Link>
        <button onClick={saveTodo}>Save</button>
      </div>
    </div>
  )
}
