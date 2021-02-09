export class MaybeProvidedValueIsEmptyError extends Error {
  constructor() {
    super("Maybe's provided value must not be empty")
  }
}
