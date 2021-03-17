import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { FooCmd } from './foo-cmd'
import { BarQry } from './bar-qry'
import { Runner, CacheInvalidations, CacheLink, CacheManager, ExecutorLink, LoggerLink, Logger } from '@archimedes/arch'
import { QuxCmd } from './qux-cmd'
import { BazQry } from './baz-qry'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    { provide: LoggerLink, useFactory: () => new LoggerLink(console) },
    { provide: ExecutorLink, useClass: ExecutorLink },
    { provide: CacheManager, useClass: CacheManager },
    { provide: CacheLink, useClass: CacheLink, deps: [CacheManager] }
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap(applicationRef: ApplicationRef) {
    const cacheLink = this.injector.get(CacheLink)
    const loggerLink = this.injector.get(LoggerLink)
    const executorLink = this.injector.get(ExecutorLink)

    CacheInvalidations.set(FooCmd.name, [BarQry.name])
    CacheInvalidations.set(QuxCmd.name, [BazQry.name])

    Runner.createChain([cacheLink, executorLink, loggerLink])
    applicationRef.bootstrap(AppComponent)
  }
}
