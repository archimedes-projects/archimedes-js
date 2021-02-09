import { newE2EPage } from '@stencil/core/testing'
import { KeyCodes } from '../../../utils/keycodes'

describe('keyboard-navigation-listener', () => {
  it('should render', async () => {
    const page = await newE2EPage()
    await page.setContent('<keyboard-navigation-listener></keyboard-navigation-listener>')

    const element = await page.find('keyboard-navigation-listener')

    expect(element).toHaveClass('hydrated')
  })

  it('should ask for the up item', async () => {
    const mockGetItem = jest.fn().mockReturnValue(undefined)
    const page = await newE2EPage()
    await page.setContent(
      '<keyboard-navigation-listener><keyboard-navigable position="{x: 1}"></keyboard-navigable></keyboard-navigation-listener>'
    )
    await page.exposeFunction('getItem', mockGetItem)
    const navigable = await page.find('keyboard-navigable')
    navigable.tabIndex = -1
    await page.$eval('keyboard-navigation-listener', (element: any) => {
      // @ts-ignore
      element.handler = { getUpItem: this.getItem }
    })
    await page.waitForChanges()

    await navigable.press(KeyCodes.UP)

    expect(mockGetItem).toHaveBeenCalled()
  })

  it('should ask for the down item', async () => {
    const mockGetItem = jest.fn().mockReturnValue(undefined)
    const page = await newE2EPage()
    await page.setContent(
      '<keyboard-navigation-listener><keyboard-navigable position="{x: 1}"></keyboard-navigable></keyboard-navigation-listener>'
    )
    await page.exposeFunction('getItem', mockGetItem)
    const navigable = await page.find('keyboard-navigable')
    navigable.tabIndex = -1
    await page.$eval('keyboard-navigation-listener', (element: any) => {
      // @ts-ignore
      element.handler = { getDownItem: this.getItem }
    })
    await page.waitForChanges()

    await navigable.press(KeyCodes.DOWN)

    expect(mockGetItem).toHaveBeenCalled()
  })

  it('should ask for the left item', async () => {
    const mockGetItem = jest.fn().mockReturnValue(undefined)
    const page = await newE2EPage()
    await page.setContent(
      '<keyboard-navigation-listener><keyboard-navigable position="{x: 1}"></keyboard-navigable></keyboard-navigation-listener>'
    )
    await page.exposeFunction('getItem', mockGetItem)
    const navigable = await page.find('keyboard-navigable')
    navigable.tabIndex = -1
    await page.$eval('keyboard-navigation-listener', (element: any) => {
      // @ts-ignore
      element.handler = { getLeftItem: this.getItem }
    })
    await page.waitForChanges()

    await navigable.press(KeyCodes.LEFT)

    expect(mockGetItem).toHaveBeenCalled()
  })

  it('should ask for the right item', async () => {
    const mockGetItem = jest.fn().mockReturnValue(undefined)
    const page = await newE2EPage()
    await page.setContent(
      '<keyboard-navigation-listener><keyboard-navigable position="{x: 1}"></keyboard-navigable></keyboard-navigation-listener>'
    )
    await page.exposeFunction('getItem', mockGetItem)
    const navigable = await page.find('keyboard-navigable')
    navigable.tabIndex = -1
    await page.$eval('keyboard-navigation-listener', (element: any) => {
      // @ts-ignore
      element.handler = { getRightItem: this.getItem }
    })
    await page.waitForChanges()

    await navigable.press(KeyCodes.RIGHT)

    expect(mockGetItem).toHaveBeenCalled()
  })

  it('should ask for the first item', async () => {
    const mockGetItem = jest.fn().mockReturnValue(undefined)
    const page = await newE2EPage()
    await page.setContent(
      '<keyboard-navigation-listener><keyboard-navigable position="{x: 1}"></keyboard-navigable></keyboard-navigation-listener>'
    )
    await page.exposeFunction('getItem', mockGetItem)
    const navigable = await page.find('keyboard-navigable')
    navigable.tabIndex = -1
    await page.$eval('keyboard-navigation-listener', (element: any) => {
      // @ts-ignore
      element.handler = { getFirstItem: this.getItem }
    })
    await page.waitForChanges()

    await navigable.press(KeyCodes.HOME)

    expect(mockGetItem).toHaveBeenCalled()
  })

  it('should ask for the last item', async () => {
    const mockGetItem = jest.fn().mockReturnValue(undefined)
    const page = await newE2EPage()
    await page.setContent(
      '<keyboard-navigation-listener><keyboard-navigable position="{x: 1}"></keyboard-navigable></keyboard-navigation-listener>'
    )
    await page.exposeFunction('getItem', mockGetItem)
    const navigable = await page.find('keyboard-navigable')
    navigable.tabIndex = -1
    await page.$eval('keyboard-navigation-listener', (element: any) => {
      // @ts-ignore
      element.handler = { getLastItem: this.getItem }
    })
    await page.waitForChanges()

    await navigable.press(KeyCodes.END)

    expect(mockGetItem).toHaveBeenCalled()
  })
})
