import { Injectable } from '@angular/core'
import { Command, InvalidateCache, UseCaseKey } from '@archimedes/arch'

@UseCaseKey('QuxCmd')
@InvalidateCache
@Injectable({
  providedIn: 'root'
})
export class QuxCmd extends Command<number> {
  async internalExecute(value: number) {}
}
