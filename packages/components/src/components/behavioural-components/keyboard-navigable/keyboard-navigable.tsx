import { Component, h, Host, Event, EventEmitter, Listen } from '@stencil/core'
import { KeyCodes } from '../../../utils/keycodes'

export interface KeyboardNavigationAction {
  key: string
  shift: boolean
  ctrl: boolean
  alt: boolean
  meta: boolean
}

@Component({
  tag: 'keyboard-navigable',
  styleUrl: 'keyboard-navigable.css',
  shadow: true
})
export class KeyboardNavigable {
  @Event() keyboardNavigation!: EventEmitter<KeyboardNavigationAction>

  @Listen('keyup')
  protected keyupHandler(event: KeyboardEvent) {
    const action: KeyboardNavigationAction = {
      key: '',
      shift: event.shiftKey,
      ctrl: event.ctrlKey,
      alt: event.altKey,
      meta: event.metaKey
    }
    switch (event.key) {
      case KeyCodes.UP:
        event.preventDefault()
        event.stopPropagation()
        action.key = KeyCodes.UP
        this.keyboardNavigation.emit(action)
        break
      case KeyCodes.DOWN:
        event.preventDefault()
        event.stopPropagation()
        action.key = KeyCodes.DOWN
        this.keyboardNavigation.emit(action)
        break
      case KeyCodes.LEFT:
        event.preventDefault()
        event.stopPropagation()
        action.key = KeyCodes.LEFT
        this.keyboardNavigation.emit(action)
        break
      case KeyCodes.RIGHT:
        event.preventDefault()
        event.stopPropagation()
        action.key = KeyCodes.RIGHT
        this.keyboardNavigation.emit(action)
        break
      case KeyCodes.HOME:
        event.preventDefault()
        event.stopPropagation()
        action.key = KeyCodes.HOME
        this.keyboardNavigation.emit(action)
        break
      case KeyCodes.END:
        event.preventDefault()
        event.stopPropagation()
        action.key = KeyCodes.END
        this.keyboardNavigation.emit(action)
        break
    }
  }

  render() {
    return (
      <Host role="none">
        <slot />
      </Host>
    )
  }
}
