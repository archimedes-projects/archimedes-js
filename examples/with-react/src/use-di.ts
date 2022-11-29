import { useMemo } from 'react'
import { constructor } from 'tsyringe/dist/typings/types'
import { container } from './core/di/container'

export function useDi<T>(token: constructor<T> | string) {
  return useMemo(() => container.resolve(token), [token])
}
