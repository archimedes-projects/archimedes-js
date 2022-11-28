import { injectable } from 'tsyringe'
import { InvalidateCache, Query, UseCaseKey } from '@archimedes/arch'

@InvalidateCache
@UseCaseKey('BazQry')
@injectable()
export class BazQry extends Query<number> {
  async internalExecute(): Promise<number> {
    return 42
  }
}
