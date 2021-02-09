import { Component, Event, EventEmitter, h, State } from '@stencil/core'
import refresh from './refresh.svg'

@Component({
  tag: 'arch-swiper',
  styleUrl: 'swiper.css',
  shadow: true
})
export class Swiper {
  @Event()
  swipe!: EventEmitter<void>

  static readonly MAX_OFFSET = 200
  static readonly MIN_OFFSET = 100

  private swipeStartCoord = 0

  @State()
  swipingPixels = 0

  @State()
  isCurrentlySwiping = false

  wrapper!: HTMLDivElement

  touchStart(touchEvent: TouchEvent): void {
    this.swipeStartCoord = this.getY(touchEvent)
    this.isCurrentlySwiping = this.getWindow().pageYOffset === 0
  }

  touchMove(touchEvent: TouchEvent): void {
    if (!this.isCurrentlySwiping) {
      return
    }
    const touchCoord = this.getY(touchEvent)
    this.swipingPixels = touchCoord - this.swipeStartCoord

    if (this.swipingPixels < Swiper.MAX_OFFSET) {
      this.wrapper.style.paddingTop = `${this.swipingPixels}px`
    }
  }

  resetPull(touchEvent: TouchEvent): void {
    if (!this.isCurrentlySwiping) {
      return
    }
    const touchCoord = this.getY(touchEvent)
    this.isCurrentlySwiping = false
    this.wrapper.style.paddingTop = '0px'
    this.swipingPixels = touchCoord - this.swipeStartCoord
    if (this.swipingPixels >= Swiper.MAX_OFFSET) {
      this.swipe.emit()
    }
    this.swipingPixels = 0
  }

  private getY(e: TouchEvent) {
    return e.changedTouches[0].clientY
  }

  private getWindow(): Window {
    return window
  }

  private isSwiping() {
    return this.isCurrentlySwiping && this.swipingPixels > Swiper.MIN_OFFSET
  }

  render() {
    return (
      <div
        class="wrapper"
        ref={el => (this.wrapper = el as HTMLDivElement)}
        onTouchStart={(event: TouchEvent) => this.touchStart(event)}
        onTouchMove={(event: TouchEvent) => this.touchMove(event)}
        onTouchEnd={(event: TouchEvent) => this.resetPull(event)}
      >
        {this.isSwiping() && (
          <div class="swiper">
            <img src={refresh} class="icon" />
          </div>
        )}
        <div class={{ content: true, veil: this.isSwiping() }}>
          <slot></slot>
        </div>
      </div>
    )
  }
}
