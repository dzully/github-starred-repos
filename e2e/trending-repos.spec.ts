import { test, expect } from "@playwright/test"

test.describe("Trending Repos Page", () => {
  test("should load and display trending repos", async ({ page }) => {
    await page.goto("/")

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Trending Repos/)

    // Check if the header is present
    const header = page.locator('h1:has-text("Trending Repos")')
    await expect(header).toBeVisible()

    // Wait for the repos to load
    await page.waitForSelector('[data-testid="repo-list"]')

    // Check if at least one repo card is visible
    const repoCards = page.locator('[data-testid="repo-card"]')
    await expect(repoCards.first()).toBeVisible()

    // Check if the repo cards have the expected content
    await expect(repoCards.first().locator(".text-2xl")).toBeVisible() // Repo name
    await expect(repoCards.first().locator(".text-gray-700")).toBeVisible() // Repo description
    await expect(repoCards.first().locator(".text-yellow-500")).toBeVisible() // Star icon
  })

  test("should load more repos on scroll", async ({ page }) => {
    await page.goto("/")

    // Wait for the initial repos to load
    await page.waitForSelector('[data-testid="repo-card"]')

    // Get the initial number of repo cards
    const initialRepoCount = await page.locator('[data-testid="repo-card"]').count()

    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Wait for new repos to load
    await page.waitForFunction((initialCount) => {
      return document.querySelectorAll('[data-testid="repo-card"]').length > initialCount
    }, initialRepoCount)

    // Check if the number of repo cards has increased
    const newRepoCount = await page.locator('[data-testid="repo-card"]').count()
    expect(newRepoCount).toBeGreaterThan(initialRepoCount)
  })

  test("should navigate to settings page", async ({ page }) => {
    await page.goto("/")

    // Click on the settings button
    await page.click('button:has-text("Settings")')

    // Check if the URL has changed to the settings page
    await expect(page).toHaveURL(/.*settings/)

    // Check if the settings page content is visible
    await expect(page.locator('h1:has-text("Settings")')).toBeVisible()
  })
})

