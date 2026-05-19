import { defineConfig } from '@playwright/test'

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

export default defineConfig({
  testDir: '.',
  testMatch: 'qa_playwright.spec.ts',
  timeout: 30000,
  projects: [
    {
      name: 'chromium',
      use: {
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          executablePath: CHROME,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        },
      },
    },
  ],
})
