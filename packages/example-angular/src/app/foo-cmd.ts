import { Injectable } from '@angular/core'
import { Command, EvictCache } from '@archimedes/arch'

@EvictCache
@Injectable({
  providedIn: 'root'
})
export class FooCmd extends Command<number> {
  async internalExecute(value: number) {}
}
