import { injectable } from 'tsyringe'
import { EvictCache, Query } from '@archimedes/arch'

@EvictCache
@injectable()
export class BazQry extends Query<number> {
  async internalExecute(param: void): Promise<number> {
    return 42
  }
}
