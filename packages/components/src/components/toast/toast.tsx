import { Component, h, Prop } from '@stencil/core'

@Component({
  tag: 'arch-toast',
  styleUrl: 'toast.css',
  shadow: true
})
export class Toast {
  @Prop()
  type?: 'error' | 'info' | 'success'

  render() {
    return (
      <div class={{ [this.type ?? '']: true, toast: true }}>
        <p>
          <slot></slot>
        </p>
      </div>
    )
  }
}
