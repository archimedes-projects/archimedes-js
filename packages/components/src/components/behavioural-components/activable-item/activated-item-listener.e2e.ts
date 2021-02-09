import { newE2EPage } from '@stencil/core/testing'
import { KeyCodes } from '../../../utils/keycodes'

describe('activated-item-listener', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<activated-item-listener></activated-item-listener>')

    const element = await page.find('activated-item-listener')

    expect(element).toHaveClass('hydrated')
  })

  it('should notify item activation', async () => {
    const mockNotifyActivation = jest.fn().mockReturnValue(undefined)
    const page = await newE2EPage()
    await page.setContent('<activated-item-listener><activable-item></activable-item></activated-item-listener>')
    await page.exposeFunction('notifyActivation', mockNotifyActivation)
    const activable = await page.find('activable-item')
    activable.tabIndex = -1
    await page.$eval('activated-item-listener', (element: any) => {
      // @ts-ignore
      element.handler = { notifyActivation: this.notifyActivation }
    })
    await page.waitForChanges()

    await activable.press(KeyCodes.SPACE)

    expect(mockNotifyActivation).toHaveBeenCalled()
  })
})
