import { render, screen } from "@/test/test-utils"
import { SettingsPage } from "./settings-page"
import { vi } from "vitest"
import renderer from "react-test-renderer"

// Mock the settings components
vi.mock("@/features/general-settings", () => ({
  GeneralSettings: () => <div data-testid="general-settings">General Settings</div>,
}))
vi.mock("@/features/notification-settings", () => ({
  NotificationSettings: () => <div data-testid="notification-settings">Notification Settings</div>,
}))
vi.mock("@/features/appearance-settings", () => ({
  AppearanceSettings: () => <div data-testid="appearance-settings">Appearance Settings</div>,
}))
vi.mock("@/features/integration-settings", () => ({
  IntegrationSettings: () => <div data-testid="integration-settings">Integration Settings</div>,
}))

describe("SettingsPage", () => {
  it("renders all settings components", () => {
    render(<SettingsPage />)
    expect(screen.getByTestId("general-settings")).toBeInTheDocument()
    expect(screen.getByTestId("notification-settings")).toBeInTheDocument()
    expect(screen.getByTestId("appearance-settings")).toBeInTheDocument()
    expect(screen.getByTestId("integration-settings")).toBeInTheDocument()
  })

  it("wraps settings components in SettingsLayout", () => {
    render(<SettingsPage />)
    const settingsLayout = screen.getByTestId("settings-layout")
    expect(settingsLayout).toContainElement(screen.getByTestId("general-settings"))
    expect(settingsLayout).toContainElement(screen.getByTestId("notification-settings"))
    expect(settingsLayout).toContainElement(screen.getByTestId("appearance-settings"))
    expect(settingsLayout).toContainElement(screen.getByTestId("integration-settings"))
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<SettingsPage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

