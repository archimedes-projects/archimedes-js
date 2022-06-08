import { BazQry } from './baz-qry'
import { injectable } from 'tsyringe'
import { EvictCache, Query } from '@archimedes/arch'

@EvictCache
@injectable()
export class BarQry extends Query<number> {
  constructor(private readonly bazQry: BazQry) {
    super()
  }

  async internalExecute(param: void): Promise<number> {
    return this.bazQry.execute()
  }
}
