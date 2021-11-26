import { Injectable } from '@angular/core'
import { CacheKey, Query } from '@archimedes/arch'

@CacheKey('BQry')
@Injectable({
  providedIn: 'root'
})
export class BQry extends Query<number> {
  async internalExecute(param: void): Promise<number> {
    return 2
  }
}
