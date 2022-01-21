import 'reflect-metadata'
import { Class } from '@archimedes/utils'
import { UseCase } from '../use-case/use-case'
import { CacheInvalidations } from '../runner/cache-invalidations'

export function InvalidateCache(clazz: Class): void {
  const metadata: Class[] | undefined = Reflect.getMetadata('design:paramtypes', clazz)
  if (metadata !== undefined) {
    CacheInvalidations.set(
      clazz.name,
      metadata.filter(x => x.prototype instanceof UseCase).map(x => x.name)
    )
  }
}
