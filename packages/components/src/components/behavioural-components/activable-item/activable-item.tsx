import { Component, h, Host, Prop, Event, EventEmitter, Listen } from '@stencil/core'
import { KeyCodes } from '../../../utils/keycodes'
import { ItemPosition } from '../../../utils/position'

@Component({
  tag: 'activable-item',
  styleUrl: 'activable-item.css',
  shadow: true
})
export class ActivableItem {
  @Prop() position: ItemPosition | undefined = undefined
  @Prop() space: boolean = true
  @Prop() enter: boolean = true

  @Event() activatedItem!: EventEmitter<ItemPosition | undefined>

  @Listen('click')
  protected clickHandler() {
    this.activatedItem.emit(this.position)
  }

  @Listen('keyup')
  protected keyupHandler(event: KeyboardEvent) {
    function activate(event: KeyboardEvent, emitter: EventEmitter<ItemPosition | undefined>, position?: ItemPosition) {
      event.preventDefault()
      event.stopPropagation()
      emitter.emit(position)
    }

    if (this.space && event.key === KeyCodes.SPACE) activate(event, this.activatedItem, this.position)
    else if (this.enter && event.key === KeyCodes.RETURN) activate(event, this.activatedItem, this.position)
  }

  render() {
    return (
      <Host role="none">
        <slot />
      </Host>
    )
  }
}
