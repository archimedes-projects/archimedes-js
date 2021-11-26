import { CacheManager, ExecutorLink, LoggerLink, QueryCacheLink, Runner } from '@archimedes/arch'
import { CommonModule } from '@angular/common'
import { APP_INITIALIZER, NgModule } from '@angular/core'

const ARCHIMEDES_PROVIDERS = [
  { provide: LoggerLink, useFactory: () => new LoggerLink(console) },
  { provide: ExecutorLink, useClass: ExecutorLink },
  { provide: CacheManager, useClass: CacheManager },
  { provide: QueryCacheLink, useClass: QueryCacheLink, deps: [CacheManager] }
]

@NgModule({
  imports: [CommonModule],
  providers: [
    ...ARCHIMEDES_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: (queryCacheLink: QueryCacheLink, executorLink: ExecutorLink, loggerLink: LoggerLink) => () => {
        return Runner.createChain([queryCacheLink, executorLink, loggerLink])
      },
      deps: [QueryCacheLink, ExecutorLink, LoggerLink],
      multi: true
    }
  ]
})
export class ArchimedesModule {}
