import {Component, Event, EventEmitter, h, Prop} from '@stencil/core'

type ButtonStyles = | 'primary-theme' | 'secondary-theme' | '_blank'

@Component({
  tag: 'arch-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button {
  @Prop()
  text!: string

  @Prop()
  type: 'button' | 'submit' = 'button'

  @Prop()
  disabled = false

  @Prop()
  appearance: ButtonStyles = 'primary-theme';

  @Event()
  clicked!: EventEmitter<unknown>

  handleClick() {
    this.clicked.emit()
  }

  render() {
    return (
        <button
          class={`button ${this.appearance}`}
          type={this.type}
          disabled={this.disabled}
          onClick={() => this.handleClick()}
        >
          {/* Slot */}
          {this.text}
        </button>
    )
  }
}
