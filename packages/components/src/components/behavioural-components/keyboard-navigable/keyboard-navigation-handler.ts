import { KeyboardNavigationAction } from './keyboard-navigable'

export interface KeyboardNavigationHandler {
  getLeftItem(action: KeyboardNavigationAction): HTMLElement | undefined
  getRightItem(action: KeyboardNavigationAction): HTMLElement | undefined
  getUpItem(action: KeyboardNavigationAction): HTMLElement | undefined
  getDownItem(action: KeyboardNavigationAction): HTMLElement | undefined
  getFirstItem(action: KeyboardNavigationAction): HTMLElement | undefined
  getLastItem(action: KeyboardNavigationAction): HTMLElement | undefined
}
