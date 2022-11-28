import { useEffect, useState } from 'react'
import './App.css'
import { useDi } from './use-di'
import { FooCmd } from './foo-cmd'
import { BarQry } from './bar-qry'
import { QuxCmd } from './qux-cmd'
import { BazQry } from './baz-qry'

function App() {
  const [result, setResult] = useState(0)
  const [calls, setCalls] = useState(0)

  const fooCmd = useDi(FooCmd)
  useEffect(() => {
    const id = fooCmd.subscribe(() => setCalls(x => x + 1))
    return () => fooCmd.unsubscribe(id)
  })
  const barQry = useDi(BarQry)
  const quxCmd = useDi(QuxCmd)
  const bazQry = useDi(BazQry)
  return (
    <div className="App">
      <button onClick={() => fooCmd.execute(1)}>Invalidate Bar</button>
      <button onClick={() => quxCmd.execute(1)}>Invalidate Baz</button>
      <button onClick={() => barQry.execute().then(setResult)}>Bar</button>
      <button onClick={() => bazQry.execute().then(setResult)}>Baz</button>

      <h2>Result</h2>
      <p>{result}</p>
      <h2>Bar called</h2>
      <p>{calls}</p>
    </div>
  )
}

export default App
