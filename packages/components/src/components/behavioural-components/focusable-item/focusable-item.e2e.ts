import { newE2EPage } from '@stencil/core/testing'
import { ItemPosition } from '../../../utils/position'

describe('focusable-item', () => {
  it('should render out of tab sequence', async () => {
    const page = await newE2EPage()
    await page.setContent('<focusable-item></focusable-item>')

    const element = await page.find('focusable-item')

    expect(element).toHaveClass('hydrated')
    expect(element.tabIndex).toBe(-1)
  })

  it('should render into the tab sequence', async () => {
    const page = await newE2EPage()
    await page.setContent('<focusable-item></focusable-item>')
    const element = await page.find('focusable-item')

    element.setProperty('isInTabSequence', true)
    await page.waitForChanges()

    expect(element).toHaveClass('hydrated')
    expect(element.tabIndex).toBe(0)
  })

  it('should notify focused', async () => {
    const page = await newE2EPage()
    const position: ItemPosition = { x: 3, y: 1 }
    await page.setContent('<focusable-item></focusable-item>')
    const element = await page.find('focusable-item')
    element.setProperty('position', position)
    await page.waitForChanges()
    const spyEvent = await element.spyOnEvent('focusedItem')

    await element.focus()

    expect(spyEvent).toHaveReceivedEventDetail(position)
  })
})
