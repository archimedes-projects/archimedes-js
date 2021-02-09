import { newE2EPage } from '@stencil/core/testing'
import { KeyCodes } from '../../../utils/keycodes'

describe('activable-item', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<activable-item></activable-item>')

    const element = await page.find('activable-item')

    expect(element).toHaveClass('hydrated')
  })

  it('should be activated on pressing space', async () => {
    const page = await newE2EPage()
    await page.setContent('<activable-item></activable-item>')
    const element = await page.find('activable-item')
    const spyEvent = await element.spyOnEvent('activatedItem')
    element.tabIndex = -1
    await page.waitForChanges()

    await element.press(KeyCodes.SPACE)

    expect(spyEvent).toHaveReceivedEventTimes(1)
  })

  it('should be activated on pressing enter', async () => {
    const page = await newE2EPage()
    await page.setContent('<activable-item></activable-item>')
    const element = await page.find('activable-item')
    const spyEvent = await element.spyOnEvent('activatedItem')
    element.tabIndex = -1
    await page.waitForChanges()

    await element.press(KeyCodes.RETURN)

    expect(spyEvent).toHaveReceivedEventTimes(1)
  })

  it('should NOT be activated on pressing space', async () => {
    const page = await newE2EPage()
    await page.setContent('<activable-item space="false"></activable-item>')
    const element = await page.find('activable-item')
    const spyEvent = await element.spyOnEvent('activatedItem')
    element.tabIndex = -1
    await page.waitForChanges()

    await element.press(KeyCodes.SPACE)
    await element.press(KeyCodes.RETURN)

    expect(spyEvent).toHaveReceivedEventTimes(1)
  })

  it('should NOT be activated on pressing enter', async () => {
    const page = await newE2EPage()
    await page.setContent('<activable-item enter="false"></activable-item>')
    const element = await page.find('activable-item')
    const spyEvent = await element.spyOnEvent('activatedItem')
    element.tabIndex = -1
    await page.waitForChanges()

    await element.press(KeyCodes.SPACE)
    await element.press(KeyCodes.RETURN)

    expect(spyEvent).toHaveReceivedEventTimes(1)
  })
})
