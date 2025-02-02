import { render, screen } from "@/test/test-utils"
import { TrendingRepos } from "./trending-repos"

describe("TrendingRepos", () => {
  it("renders the header correctly", () => {
    render(<TrendingRepos />)

    expect(screen.getByText("Trending Repos")).toBeInTheDocument()
  })

  it("renders with the correct layout classes", () => {
    render(<TrendingRepos />)

    const header = screen.getByText("Trending Repos").closest("div")
    expect(header).toHaveClass("border-b", "md:border-b-0")
  })

  it("renders the RepoList component", () => {
    render(<TrendingRepos />)

    // RepoList should be present in the document
    // We can verify this by checking for its container
    expect(screen.getByTestId("repo-list")).toBeInTheDocument()
  })
})

