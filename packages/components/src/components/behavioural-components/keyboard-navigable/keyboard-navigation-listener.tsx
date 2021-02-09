import { Component, h, Prop, Host, Listen } from '@stencil/core'
import { KeyboardNavigationHandler } from './keyboard-navigation-handler'
import { KeyboardNavigationAction } from './keyboard-navigable'
import { KeyCodes } from '../../../utils/keycodes'

@Component({
  tag: 'keyboard-navigation-listener',
  shadow: true
})
export class KeyboardNavigationListener {
  @Prop() handler!: KeyboardNavigationHandler

  @Listen('keyboardNavigation')
  protected navigationHandler(event: CustomEvent<KeyboardNavigationAction>) {
    event?.stopPropagation()
    switch (event.detail.key) {
      case KeyCodes.UP:
        this.focus(this.handler.getUpItem(event.detail))
        break
      case KeyCodes.DOWN:
        this.focus(this.handler.getDownItem(event.detail))
        break
      case KeyCodes.LEFT:
        this.focus(this.handler.getLeftItem(event.detail))
        break
      case KeyCodes.RIGHT:
        this.focus(this.handler.getRightItem(event.detail))
        break
      case KeyCodes.HOME:
        this.focus(this.handler.getFirstItem(event.detail))
        break
      case KeyCodes.END:
        this.focus(this.handler.getLastItem(event.detail))
        break
    }
  }

  private focus = (element: HTMLElement | undefined): void => {
    if (element instanceof HTMLElement) element.focus()
  }

  render() {
    return (
      <Host role="none">
        <slot />
      </Host>
    )
  }
}
