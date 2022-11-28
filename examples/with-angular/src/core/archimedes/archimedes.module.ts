import { Archimedes, CacheLink, CacheManager, ExecutorLink, LoggerLink } from '@archimedes/arch'
import { CommonModule } from '@angular/common'
import { APP_INITIALIZER, NgModule } from '@angular/core'

const ARCHIMEDES_PROVIDERS = [
  { provide: LoggerLink, useFactory: () => new LoggerLink(console) },
  { provide: ExecutorLink, useClass: ExecutorLink },
  { provide: CacheManager, useFactory: () => new CacheManager() },
  { provide: CacheLink, useClass: CacheLink, deps: [CacheManager] }
]

@NgModule({
  imports: [CommonModule],
  providers: [
    ...ARCHIMEDES_PROVIDERS,
    {
      provide: APP_INITIALIZER,
      useFactory: (cacheLink: CacheLink, executorLink: ExecutorLink, loggerLink: LoggerLink) => () => {
        return Archimedes.createChain([cacheLink, executorLink, loggerLink])
      },
      deps: [CacheLink, ExecutorLink, LoggerLink],
      multi: true
    }
  ]
})
export class ArchimedesModule {}
