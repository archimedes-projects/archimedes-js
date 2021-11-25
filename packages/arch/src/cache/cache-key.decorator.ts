import { Class } from '@archimedes/utils'

/**
* Decorator to add the cache key to a use case class.
* @example
* ```ts
* @CacheKey('QryA')
* class QryA extends Query {
*  constructor(private qryB: QryB) {}
* }
* ```
* @param {string} key The Class name
* */
export function CacheKey(key: string) {
  return (useCase: Class) => {
    const useCaseName = useCase.name
    if (useCaseName !== key) {
      console.error(`Provided cache key [ ${key} ] is different than use case name [ ${useCaseName} ]`)
    }

    useCase.prototype.cacheKey = key
  }
}
