import { BazQry } from './baz-qry'
import { injectable } from 'tsyringe'
import { InvalidateCache, Query, UseCaseKey } from '@archimedes/arch'

@InvalidateCache
@UseCaseKey('BarQry')
@injectable()
export class BarQry extends Query<number> {
  constructor(private readonly bazQry: BazQry) {
    super()
  }

  async internalExecute(): Promise<number> {
    return this.bazQry.execute()
  }
}
