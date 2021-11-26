import { Injectable } from '@angular/core'
import { CacheKey, Query } from '@archimedes/arch'

@CacheKey('CQry')
@Injectable({
  providedIn: 'root'
})
export class CQry extends Query<number> {
  async internalExecute(param: void): Promise<number> {
    return 3
  }
}
