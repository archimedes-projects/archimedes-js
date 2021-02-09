import { Component, h, Host, Prop, Listen } from '@stencil/core'
import { ItemPosition } from '../../../utils/position'
import { FocusedItemHandler } from './focused-item-handler'

@Component({
  tag: 'focused-item-listener',
  shadow: true
})
export class FocusedItemListener {
  @Prop() handler!: FocusedItemHandler

  @Listen('focusedItem')
  protected focusedItemHandler(event: CustomEvent<ItemPosition>) {
    event.stopPropagation()
    this.handler.notifyFocusedItem(event.detail)
  }

  render() {
    return (
      <Host role="none">
        <slot />
      </Host>
    )
  }
}
