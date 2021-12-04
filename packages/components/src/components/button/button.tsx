import { Component, Event, EventEmitter, h, Listen, Prop } from '@stencil/core'

type Theme = 'primary' | 'secondary'

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

  @Listen('click')
  handleClick(event: MouseEvent) {
    this.clicked.emit(event)
  }

  render() {
    const { theme, type, disabled } = this

    return (
      <button class={`button ${theme}`} type={type} disabled={disabled}>
        <slot />
      </button>
    )
  }
}
