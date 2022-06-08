import { injectable } from 'tsyringe'
import { Command, InvalidateCache } from '@archimedes/arch'

@InvalidateCache
@injectable()
export class FooCmd extends Command<number> {
  async internalExecute(value: number) {}
}
