import { Timer } from './timer'

jest.useFakeTimers()

describe('Timer', () => {
  it('should create a timer', () => {
    let done = false

    Timer.create(() => {
      done = true
    }, 1000)

    jest.runAllTimers()
    expect(done).toBe(true)
  })

  it('should create a timer and then stop it', () => {
    let done = false

    const timer = Timer.create(() => {
      done = true
    }, 1000)
    timer.pause()
    jest.runAllTimers()

    expect(done).toBe(false)
  })

  it('should create a timer, stop it and resume it', () => {
    let done = false

    const timer = Timer.create(() => {
      done = true
    }, 1000)
    jest.advanceTimersByTime(500)
    timer.pause()
    jest.advanceTimersByTime(1000)
    expect(done).toBe(false)
    timer.resume()
    jest.advanceTimersByTime(500)

    expect(done).toBe(true)
  })
})
