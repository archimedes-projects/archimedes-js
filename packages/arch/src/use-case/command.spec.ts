import { Command } from './command'

describe('Command', () => {
  it('should be an use case which is not readonly', () => {
    class MockCommand extends Command {
      async internalExecute(): Promise<void> {}
    }
    const mockQry = new MockCommand()

    expect(mockQry.readonly).toBe(false)
  })
})
