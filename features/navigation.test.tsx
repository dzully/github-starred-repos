import { render, screen, fireEvent } from "@/test/test-utils"
import { Navigation } from "./navigation"

describe("Navigation", () => {
  const defaultProps = {
    className: "test-class",
    onSettingsClick: vi.fn(),
    onTrendingClick: vi.fn(),
    showSettings: false,
  }

  it("renders all navigation items", () => {
    render(<Navigation {...defaultProps} />)

    expect(screen.getByText("Trending")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })

  it("handles trending click", () => {
    render(<Navigation {...defaultProps} />)

    fireEvent.click(screen.getByText("Trending"))
    expect(defaultProps.onTrendingClick).toHaveBeenCalled()
  })

  it("handles settings click", () => {
    render(<Navigation {...defaultProps} />)

    fireEvent.click(screen.getByText("Settings"))
    expect(defaultProps.onSettingsClick).toHaveBeenCalled()
  })

  it("applies active styles to trending when not showing settings", () => {
    render(<Navigation {...defaultProps} showSettings={false} />)

    const trendingButton = screen.getByText("Trending").closest("button")
    expect(trendingButton).toHaveClass("text-blue-500")
  })

  it("applies active styles to settings when showing settings", () => {
    render(<Navigation {...defaultProps} showSettings={true} />)

    const settingsButton = screen.getByText("Settings").closest("button")
    expect(settingsButton).toHaveClass("text-blue-500")
  })

  it("applies custom className", () => {
    render(<Navigation {...defaultProps} className="custom-class" />)

    const nav = screen.getByRole("navigation")
    expect(nav).toHaveClass("custom-class")
  })
})

