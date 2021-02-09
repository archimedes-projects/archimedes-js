import { Query } from './query'

describe('Query', () => {
  it('should be an use case which is readonly', () => {
    class MockQry extends Query {
      async internalExecute(): Promise<void> {}
    }
    const mockQry = new MockQry()

    expect(mockQry.readonly).toBe(true)
  })
})
