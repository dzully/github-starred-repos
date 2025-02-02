import { test, expect } from "@playwright/test"

test.describe("Settings Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/settings")
  })

  test("should display all settings tabs", async ({ page }) => {
    const tabs = ["General", "Notifications", "Appearance", "Integrations"]
    for (const tab of tabs) {
      await expect(page.locator(`button:has-text("${tab}")`)).toBeVisible()
    }
  })

  test("should switch between settings tabs", async ({ page }) => {
    const tabs = ["General", "Notifications", "Appearance", "Integrations"]
    for (const tab of tabs) {
      await page.click(`button:has-text("${tab}")`)
      await expect(page.locator(`h2:has-text("${tab}")`)).toBeVisible()
    }
  })

  test("should interact with form elements", async ({ page }) => {
    // Test General settings
    await page.click('button:has-text("General")')
    await page.fill('input[placeholder="Your username"]', "testuser")
    await page.fill('input[placeholder="Your email"]', "test@example.com")
    await page.click('button:has-text("Save Changes")')

    // Test Notifications settings
    await page.click('button:has-text("Notifications")')
    await page.click('label:has-text("New trending repositories")')
    await page.click('label:has-text("Product updates")')

    // Test Appearance settings
    await page.click('button:has-text("Appearance")')
    await page.click('label:has-text("Dark")')
    await page.click('button[aria-label="blue accent color"]')

    // Test Integrations settings
    await page.click('button:has-text("Integrations")')
    await page.click('button:has-text("Connect"):nth-of-type(1)')
  })
})

