import { Injectable } from '@angular/core'
import { Command, InvalidateCache, UseCaseKey } from '@archimedes/arch'

@UseCaseKey('FooCmd')
@InvalidateCache
@Injectable({
  providedIn: 'root'
})
export class FooCmd extends Command<number> {
  async internalExecute(value: number) {}
}
