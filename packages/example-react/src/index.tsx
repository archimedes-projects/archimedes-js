import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { CacheInvalidations, CacheLink, CacheManager, ExecutorLink, LoggerLink, Runner } from '@archimedes/arch'
import { FooCmd } from './foo-cmd'
import { BazQry } from './baz-qry'
import { QuxCmd } from './qux-cmd'
import { BarQry } from './bar-qry'

CacheInvalidations.set(FooCmd.name, [BarQry.name])
CacheInvalidations.set(QuxCmd.name, [BazQry.name])

Runner.createChain([new CacheLink(new CacheManager()), new ExecutorLink(), new LoggerLink()])

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
