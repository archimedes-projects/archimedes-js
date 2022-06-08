import { injectable } from 'tsyringe'
import { InvalidateCache, Query } from '@archimedes/arch'

@InvalidateCache
@injectable()
export class BazQry extends Query<number> {
  async internalExecute(): Promise<number> {
    return 42
  }
}
