import { ItemPosition } from '../../../utils/position'

export interface FocusedItemHandler {
  notifyFocusedItem(position: ItemPosition): void
}
