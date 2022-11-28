import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Archimedes, CacheInvalidations, CacheLink, CacheManager, ExecutorLink, LoggerLink } from '@archimedes/arch'
import { FooCmd } from './foo-cmd'
import { QuxCmd } from './qux-cmd'
import { BarQry } from './bar-qry'

CacheInvalidations.set(FooCmd.name, [BarQry.prototype.key])
CacheInvalidations.set(QuxCmd.name, ['BazQry'])

Archimedes.createChain([new CacheLink(new CacheManager()), new ExecutorLink(), new LoggerLink(console)])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
