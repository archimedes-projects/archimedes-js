import { Component, Event, EventEmitter, h, Prop } from '@stencil/core'
import { Theme } from '../../utils/theme'

@Component({
  tag: 'arch-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button {
  @Prop()
  type: 'button' | 'submit' = 'button'

  @Prop()
  disabled = false

  @Prop()
  theme: Theme = 'primary'

  @Event()
  clicked!: EventEmitter<MouseEvent>

  handleClick(event: MouseEvent) {
    this.clicked.emit(event)
  }

  render() {
    return (
      <button
        class={`button ${this.theme}`}
        type={this.type}
        disabled={this.disabled}
        onClick={event => this.handleClick(event)}
      >
        <slot />
      </button>
    )
  }
}
