import { Class } from '@archimedes/utils'

export const USE_CASE_KEY = '__useCaseKey'

export function UseCaseKey(key: string) {
  return (useCase: Class) => {
    const useCaseName = useCase.name
    if (process.env.NODE_ENV !== 'production' && useCaseName !== key) {
      // eslint-disable-next-line no-console
      console.error(`Provided use case key [${key}] is different than use case name [${useCaseName}]`)
    }

    useCase.prototype[USE_CASE_KEY] = key
  }
}
