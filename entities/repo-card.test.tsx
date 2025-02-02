import { render, screen } from "@/test/test-utils"
import { RepoCard } from "./repo-card"
import renderer from "react-test-renderer"

describe("RepoCard", () => {
  const defaultProps = {
    name: "test-repo",
    description: "Test description",
    stars: "1,234",
    owner: {
      name: "test-user",
      avatar: "https://example.com/avatar.jpg",
    },
    url: "https://github.com/test-user/test-repo",
    category: "web" as const,
  }

  it("renders correctly with all props", () => {
    render(<RepoCard {...defaultProps} />)

    expect(screen.getByText("test-repo")).toBeInTheDocument()
    expect(screen.getByText("Test description")).toBeInTheDocument()
    expect(screen.getByText("1,234")).toBeInTheDocument()
    expect(screen.getByText("test-user")).toBeInTheDocument()
    expect(screen.getByAltText("test-user's avatar")).toBeInTheDocument()
  })

  it("opens repository URL in new tab when clicked", async () => {
    render(<RepoCard {...defaultProps} />)
    const link = screen.getByRole("link")

    expect(link).toHaveAttribute("href", defaultProps.url)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("handles missing description gracefully", () => {
    render(<RepoCard {...defaultProps} description="" />)
    expect(screen.getByText("No description available")).toBeInTheDocument()
  })

  it("applies correct category styles", () => {
    const { rerender } = render(<RepoCard {...defaultProps} category="ml" />)
    expect(screen.getByRole("link").firstChild).toHaveClass("from-purple-100")

    rerender(<RepoCard {...defaultProps} category="web" />)
    expect(screen.getByRole("link").firstChild).toHaveClass("from-orange-50")
  })

  it("renders with default category if none provided", () => {
    const { category, ...propsWithoutCategory } = defaultProps
    render(<RepoCard {...propsWithoutCategory} />)
    expect(screen.getByRole("link").firstChild).toHaveClass("from-orange-50")
  })

  it("matches snapshot", () => {
    const tree = renderer.create(<RepoCard {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

