import { newE2EPage } from '@stencil/core/testing'

describe('Button', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<arch-button></arch-button>')
    const button = await page.find('arch-button >>> button')

    expect(button).toHaveClass('button')
    expect(button).toHaveClass('primary')
    expect(await button.getProperty('type')).toBe('button')
    expect(await button.getProperty('disabled')).toBe(false)
  })

  it('should renders changes to the type', async () => {
    const page = await newE2EPage()
    await page.setContent('<arch-button></arch-button>')
    const element = await page.find('arch-button')
    const button = await page.find('arch-button >>> button')

    element.setProperty('type', 'submit')
    await page.waitForChanges()

    expect(await button.getProperty('type')).toBe('submit')
  })

  it('should renders change the theme', async () => {
    const page = await newE2EPage()
    await page.setContent('<arch-button></arch-button>')
    const button = await page.find('arch-button')

    button.setProperty('theme', 'secondary')
    await page.waitForChanges()

    expect(await button.getProperty('theme')).toBe('secondary')
  })

  it('should renders change the disabled status', async () => {
    const page = await newE2EPage()
    await page.setContent('<arch-button></arch-button>')
    const element = await page.find('arch-button')
    const button = await page.find('arch-button >>> button')

    element.setProperty('disabled', true)
    await page.waitForChanges()

    expect(await button.getProperty('disabled')).toBe(true)
  })

  it('should emit an event when the button is clicked', async () => {
    const page = await newE2EPage()
    await page.setContent('<arch-button></arch-button>')
    const element = await page.find('arch-button')
    const spyEvent = await element.spyOnEvent('clicked')

    await element.click()

    expect(spyEvent).toHaveReceivedEventTimes(1)
  })
})
