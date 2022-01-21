import { Component, h, Prop, Host, Listen } from '@stencil/core'
import { ItemPosition } from '../../../utils/position'
import { ActivatedItemHandler } from './activated-item-handler'

@Component({
  tag: 'activated-item-listener',
  shadow: true
})
export class ActivatedItemListener {
  @Prop()
  handler!: ActivatedItemHandler

  @Listen('activatedItem')
  protected activatedItemHandler(event: CustomEvent<ItemPosition>) {
    event.stopPropagation()
    this.handler.notifyActivation(event.detail)
  }

  render() {
    return (
      <Host role="none">
        <slot />
      </Host>
    )
  }
}
