export function isPromise(object: Promise<unknown> | unknown): object is Promise<unknown> {
  return typeof object !== 'undefined' && typeof (object as Promise<unknown>).then === 'function'
}
