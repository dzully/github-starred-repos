import { render, screen } from "@/test/test-utils"
import { LoadingSpinner } from "./loading-spinner"
import renderer from "react-test-renderer"

describe("LoadingSpinner", () => {
  it("renders the loading spinner", () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId("loading-spinner")
    expect(spinner).toBeInTheDocument()
  })

  it("applies the correct classes for styling", () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId("loading-spinner")
    expect(spinner).toHaveClass("w-16", "h-16", "border-4", "border-primary", "border-t-transparent", "rounded-full")
  })

  it("has the correct ARIA role", () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole("status")
    expect(spinner).toBeInTheDocument()
  })

  it("applies animation properties", () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId("loading-spinner")
    expect(spinner).toHaveStyle("animation: spin 1s linear infinite")
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<LoadingSpinner />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

