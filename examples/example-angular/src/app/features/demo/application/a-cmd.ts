import { Injectable } from '@angular/core'
import { CacheKey, Command, InvalidateQueriesCache } from '@archimedes/arch'
import { CQry } from './c-qry'
import { AQry } from 'src/app/features/demo/application/a-qry'

@InvalidateQueriesCache(CQry)
@CacheKey('ACmd')
@Injectable({
  providedIn: 'root'
})
export class ACmd extends Command {

  constructor(private readonly aQry: AQry) {
    super()
  }

  async internalExecute() {}
}
