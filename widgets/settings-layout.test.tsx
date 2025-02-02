import { render, screen } from "@/test/test-utils"
import { SettingsLayout } from "./settings-layout"
import renderer from "react-test-renderer"

describe("SettingsLayout", () => {
  it("renders children content", () => {
    render(
      <SettingsLayout>
        <div data-testid="test-child">Test Content</div>
      </SettingsLayout>,
    )
    expect(screen.getByTestId("test-child")).toBeInTheDocument()
  })

  it("renders all tab triggers", () => {
    render(<SettingsLayout>Content</SettingsLayout>)
    expect(screen.getByRole("tab", { name: "General" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Notifications" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Appearance" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Integrations" })).toBeInTheDocument()
  })

  it("applies correct classes for layout", () => {
    render(<SettingsLayout>Content</SettingsLayout>)
    const tabsList = screen.getByRole("tablist")
    expect(tabsList).toHaveClass("w-full", "justify-start", "overflow-x-auto")
  })

  it("wraps content in a ScrollArea", () => {
    render(<SettingsLayout>Test Content</SettingsLayout>)
    const scrollArea = screen.getByText("Test Content").closest('[class*="scroll-area"]')
    expect(scrollArea).toBeInTheDocument()
  })

  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <SettingsLayout>
          <div>Test Content</div>
        </SettingsLayout>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

