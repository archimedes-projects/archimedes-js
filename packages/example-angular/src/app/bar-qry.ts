import { BazQry } from './baz-qry'
import { Injectable } from '@angular/core'
import { EvictCache, Query } from '@archimedes/arch'

@EvictCache
@Injectable({
  providedIn: 'root'
})
export class BarQry extends Query<number> {
  constructor(private readonly bazQry: BazQry) {
    super()
  }

  async internalExecute(param: void): Promise<number> {
    return this.bazQry.execute()
  }
}
