export class Timer {
  private timerId?: number | NodeJS.Timeout
  private start?: Date
  private remaining: number

  constructor(private readonly callback: () => void, delay: number) {
    this.remaining = delay
  }

  static create(callback: () => void, delay: number) {
    const timer = new Timer(callback, delay)
    timer.resume()
    return timer
  }

  resume() {
    this.start = new Date()
    clearTimeout(this.timerId as NodeJS.Timeout)
    this.timerId = setTimeout(this.callback, this.remaining)
  }

  pause() {
    clearTimeout(this.timerId as NodeJS.Timeout)
    this.remaining -= new Date().valueOf() - (this.start?.valueOf() ?? 0)
  }
}
