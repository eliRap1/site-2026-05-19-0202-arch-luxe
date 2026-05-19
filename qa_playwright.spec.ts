import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
]

test.describe('Forma Studio QA', () => {
  for (const vp of viewports) {
    test(`renders at ${vp.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      const errors: string[] = []
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
      const title = await page.title()
      expect(title).toContain('Forma Studio')
      await page.mouse.wheel(0, 500); await page.waitForTimeout(500)
      await page.mouse.wheel(0, 1000); await page.waitForTimeout(500)
      await page.mouse.wheel(0, 2000); await page.waitForTimeout(500)
      await page.mouse.wheel(0, 3000); await page.waitForTimeout(1000)
      const dir = path.join(process.cwd(), 'qa')
      if (!fs.existsSync(dir)) fs.mkdirSync(dir)
      await page.screenshot({ path: path.join(dir, `${vp.name}.png`), fullPage: false })
      if (vp.width === 375) {
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
        expect(bodyWidth).toBeLessThanOrEqual(vp.width + 5)
      }
      const criticalErrors = errors.filter(e => !e.includes('Warning:') && !e.includes('favicon') && !e.includes('ERR_NAME_NOT_RESOLVED'))
      expect(criticalErrors.length).toBeLessThanOrEqual(3)
    })
  }

  test('contact form is present', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
    await page.fill('[name="name"]', 'QA Bot')
    await page.fill('[name="email"]', 'qa@test.local')
    await page.fill('[name="message"]', 'hello')
    const btn = page.locator('button[type="submit"]')
    await expect(btn).toBeVisible()
    await expect(btn).toContainText('Send Message')
  })

  test('404 page renders', async ({ page }) => {
    await page.goto('http://localhost:3000/this-does-not-exist', { waitUntil: 'networkidle' })
    await expect(page.locator('text=404')).toBeVisible()
  })
})
