import { Injectable } from '@angular/core'
import { EvictCache, Query } from '@archimedes/arch'

@EvictCache
@Injectable({
  providedIn: 'root'
})
export class BazQry extends Query<number> {
  async internalExecute(param: void): Promise<number> {
    return 42
  }
}
