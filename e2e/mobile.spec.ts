import { test, expect } from "@playwright/test"

test.describe("Mobile View", () => {
  test.use({ viewport: { width: 375, height: 667 } }) // iPhone SE dimensions

  test("should display mobile navigation", async ({ page }) => {
    await page.goto("/")

    // Check if the mobile navigation is visible
    const mobileNav = page.locator("nav.md\\:hidden")
    await expect(mobileNav).toBeVisible()

    // Check if it contains both Trending and Settings buttons
    await expect(mobileNav.locator('button:has-text("Trending")')).toBeVisible()
    await expect(mobileNav.locator('button:has-text("Settings")')).toBeVisible()
  })

  test("should navigate between trending and settings", async ({ page }) => {
    await page.goto("/")

    // Navigate to Settings
    await page.click('nav.md\\:hidden button:has-text("Settings")')
    await expect(page).toHaveURL(/.*settings/)

    // Navigate back to Trending
    await page.click('nav.md\\:hidden button:has-text("Trending")')
    await expect(page).toHaveURL(/^(?!.*settings)/)
  })

  test("should load and display trending repos on mobile", async ({ page }) => {
    await page.goto("/")

    // Wait for the repos to load
    await page.waitForSelector('[data-testid="repo-card"]')

    // Check if the repo cards are stacked vertically
    const repoCards = page.locator('[data-testid="repo-card"]')
    await expect(repoCards.first()).toBeVisible()

    // Check the layout of the first repo card
    const firstCard = repoCards.first()
    await expect(firstCard.locator(".text-2xl")).toBeVisible() // Repo name
    await expect(firstCard.locator(".text-gray-700")).toBeVisible() // Repo description
    await expect(firstCard.locator(".text-yellow-500")).toBeVisible() // Star icon

    // Ensure cards are stacked vertically
    const firstCardBoundingBox = await firstCard.boundingBox()
    const secondCardBoundingBox = await repoCards.nth(1).boundingBox()
    expect(secondCardBoundingBox.y).toBeGreaterThan(firstCardBoundingBox.y + firstCardBoundingBox.height)
  })
})

