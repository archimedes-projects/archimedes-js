export class MaybeEmptyError extends Error {
  constructor() {
    super('Maybe is empty')
  }
}
