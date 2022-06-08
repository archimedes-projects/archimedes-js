import { injectable } from 'tsyringe'
import { Command, InvalidateCache } from '@archimedes/arch'

@InvalidateCache
@injectable()
export class QuxCmd extends Command<number> {
  async internalExecute(value: number) {}
}
