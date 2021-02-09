import { ItemPosition } from '../../../utils/position'

export interface ActivatedItemHandler {
  notifyActivation(position: ItemPosition): void
}
