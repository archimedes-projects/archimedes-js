import { newE2EPage } from '@stencil/core/testing'
import { KeyCodes } from '../../../utils/keycodes'
import { KeyboardNavigationAction } from './keyboard-navigable'

describe('keyboard-navigable', () => {
  it('should renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<keyboard-navigable></keyboard-navigable>')
    const element = await page.find('keyboard-navigable')
    expect(element).toHaveClass('hydrated')
  })

  it('should notify up arrow pressed', async () => {
    const page = await newE2EPage()

    await page.setContent('<keyboard-navigable></keyboard-navigable>')
    const element = await page.find('keyboard-navigable')
    const action: KeyboardNavigationAction = {
      key: KeyCodes.UP,
      shift: false,
      ctrl: false,
      alt: false,
      meta: false
    }
    const spyEvent = await element.spyOnEvent('keyboardNavigation')
    element.tabIndex = -1
    await page.waitForChanges()
    await element.press(KeyCodes.UP)

    expect(spyEvent).toHaveReceivedEventTimes(1)
    expect(spyEvent).toHaveReceivedEventDetail(action)
  })

  it('should notify down arrow pressed', async () => {
    const page = await newE2EPage()

    await page.setContent('<keyboard-navigable></keyboard-navigable>')
    const element = await page.find('keyboard-navigable')
    const action: KeyboardNavigationAction = {
      key: KeyCodes.DOWN,
      shift: false,
      ctrl: false,
      alt: false,
      meta: false
    }
    const spyEvent = await element.spyOnEvent('keyboardNavigation')
    element.tabIndex = -1
    await page.waitForChanges()
    await element.press(KeyCodes.DOWN)

    expect(spyEvent).toHaveReceivedEventTimes(1)
    expect(spyEvent).toHaveReceivedEventDetail(action)
  })

  it('should notify left arrow pressed', async () => {
    const page = await newE2EPage()

    await page.setContent('<keyboard-navigable></keyboard-navigable>')
    const element = await page.find('keyboard-navigable')
    const action: KeyboardNavigationAction = {
      key: KeyCodes.LEFT,
      shift: false,
      ctrl: false,
      alt: false,
      meta: false
    }
    const spyEvent = await element.spyOnEvent('keyboardNavigation')
    element.tabIndex = -1
    await page.waitForChanges()
    await element.press(KeyCodes.LEFT)

    expect(spyEvent).toHaveReceivedEventTimes(1)
    expect(spyEvent).toHaveReceivedEventDetail(action)
  })

  it('should notify right arrow pressed', async () => {
    const page = await newE2EPage()

    await page.setContent('<keyboard-navigable></keyboard-navigable>')
    const element = await page.find('keyboard-navigable')
    const action: KeyboardNavigationAction = {
      key: KeyCodes.RIGHT,
      shift: false,
      ctrl: false,
      alt: false,
      meta: false
    }
    const spyEvent = await element.spyOnEvent('keyboardNavigation')
    element.tabIndex = -1
    await page.waitForChanges()
    await element.press(KeyCodes.RIGHT)

    expect(spyEvent).toHaveReceivedEventTimes(1)
    expect(spyEvent).toHaveReceivedEventDetail(action)
  })

  it('should notify home pressed', async () => {
    const page = await newE2EPage()

    await page.setContent('<keyboard-navigable></keyboard-navigable>')
    const element = await page.find('keyboard-navigable')
    const action: KeyboardNavigationAction = {
      key: KeyCodes.HOME,
      shift: false,
      ctrl: false,
      alt: false,
      meta: false
    }
    const spyEvent = await element.spyOnEvent('keyboardNavigation')
    element.tabIndex = -1
    await page.waitForChanges()
    await element.press(KeyCodes.HOME)

    expect(spyEvent).toHaveReceivedEventTimes(1)
    expect(spyEvent).toHaveReceivedEventDetail(action)
  })

  it('should notify end pressed', async () => {
    const page = await newE2EPage()

    await page.setContent('<keyboard-navigable></keyboard-navigable>')
    const element = await page.find('keyboard-navigable')
    const action: KeyboardNavigationAction = {
      key: KeyCodes.END,
      shift: false,
      ctrl: false,
      alt: false,
      meta: false
    }
    const spyEvent = await element.spyOnEvent('keyboardNavigation')
    element.tabIndex = -1
    await page.waitForChanges()
    await element.press(KeyCodes.END)

    expect(spyEvent).toHaveReceivedEventTimes(1)
    expect(spyEvent).toHaveReceivedEventDetail(action)
  })
})
