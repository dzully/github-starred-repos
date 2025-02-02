import { render, screen, fireEvent } from "@/test/test-utils"
import { ErrorMessage } from "./error-message"
import renderer from "react-test-renderer"

describe("ErrorMessage", () => {
  const defaultProps = {
    message: "Test error message",
    onRetry: vi.fn(),
  }

  it("renders the error message", () => {
    render(<ErrorMessage {...defaultProps} />)
    expect(screen.getByText("Test error message")).toBeInTheDocument()
  })

  it('renders the "Oops! Something went wrong" title', () => {
    render(<ErrorMessage {...defaultProps} />)
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument()
  })

  it("renders a retry button", () => {
    render(<ErrorMessage {...defaultProps} />)
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument()
  })

  it("calls onRetry when the retry button is clicked", () => {
    render(<ErrorMessage {...defaultProps} />)
    fireEvent.click(screen.getByRole("button", { name: "Try again" }))
    expect(defaultProps.onRetry).toHaveBeenCalledTimes(1)
  })

  it("applies animation classes", () => {
    render(<ErrorMessage {...defaultProps} />)
    const container = screen.getByTestId("error-message-container")
    expect(container).toHaveClass("animate-in", "fade-in", "duration-300")
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<ErrorMessage {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

