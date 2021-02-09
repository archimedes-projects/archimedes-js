import { newE2EPage } from '@stencil/core/testing'
import { ItemPosition } from '../../../utils/position'

describe('focused-item-listener', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<focused-item-listener></focused-item-listener>')

    const element = await page.find('focused-item-listener')

    expect(element).toHaveClass('hydrated')
  })

  it('should notify to handler when listens a focusedItem event', async () => {
    const mockNotify = jest.fn()
    const position: ItemPosition = { x: 3, y: 1 }
    const page = await newE2EPage()
    await page.setContent('<focused-item-listener><focusable-item></focusable-item></focused-item-listener>')
    await page.exposeFunction('notifyFocusedItem', mockNotify)
    const focusable = await page.find('focusable-item')

    await focusable.setProperty('position', position)
    /* await listener.setProperty("handler", handler);
     * It doesn't work because Stencil Testing setProperty removes every function inside the object.
     */
    await page.$eval('focused-item-listener', (element: any) => {
      // @ts-ignore
      element.handler = { notifyFocusedItem: this.notifyFocusedItem }
    })
    await page.waitForChanges()
    await focusable.focus()

    expect(mockNotify).toHaveBeenCalledWith(position)
  })
})
