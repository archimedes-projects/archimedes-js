import { Injectable } from '@angular/core'
import { InvalidateCache, Query, UseCaseKey } from '@archimedes/arch'

@UseCaseKey('BazQry')
@InvalidateCache
@Injectable({
  providedIn: 'root'
})
export class BazQry extends Query<number> {
  async internalExecute(param: void): Promise<number> {
    return 42
  }
}
