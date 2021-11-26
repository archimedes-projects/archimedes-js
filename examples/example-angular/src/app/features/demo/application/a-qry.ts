import { Injectable } from '@angular/core'
import { CacheKey, Query } from '@archimedes/arch'
import { BQry } from 'src/app/features/demo/application/b-qry'

@CacheKey('AQry')
@Injectable({
  providedIn: 'root'
})
export class AQry extends Query<number> {
  constructor(private readonly bQry: BQry) {
    super()
  }

  async internalExecute(param: void): Promise<number> {
    const result = await this.bQry.execute()
    return result - 1;
  }
}
