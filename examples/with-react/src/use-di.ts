import { container } from './container'
import { constructor } from 'tsyringe/dist/typings/types'

export function useDi<T>(token: constructor<T> | string) {
  return container.resolve(token)
}
