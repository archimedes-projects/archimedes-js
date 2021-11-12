import { newE2EPage } from '@stencil/core/testing'

describe('Button', () => {
  it('should add primary theme', async () => {
    const page = await newE2EPage()
    await page.setContent('<arch-button theme="secondary"></arch-button>')
    await page.waitForChanges()
    const button = await page.find('arch-button >>> button')

    expect(button).toHaveClass('primary')
  })

  it('should add secondary theme', async () => {
    const page = await newE2EPage()
    await page.setContent('<arch-button theme="secondary"></arch-button>')
    const element = await page.find('arch-button')
    element.setProperty('theme', 'secondary')
    await page.waitForChanges()
    const button = await page.find('arch-button >>> button')

    expect(button).toHaveClass('secondary')
  })
})
