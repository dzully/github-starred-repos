import { render, screen, waitFor } from "@/test/test-utils"
import { RepoList } from "./repo-list"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import renderer from "react-test-renderer"

const mockRepos = [
  {
    id: 1,
    name: "repo-1",
    description: "Description 1",
    stargazers_count: 1000,
    owner: {
      login: "user1",
      avatar_url: "https://example.com/avatar1.jpg",
    },
    html_url: "https://github.com/user1/repo-1",
  },
  {
    id: 2,
    name: "repo-2",
    description: "Description 2",
    stargazers_count: 2000,
    owner: {
      login: "user2",
      avatar_url: "https://example.com/avatar2.jpg",
    },
    html_url: "https://github.com/user2/repo-2",
  },
]

const server = setupServer(
  rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
    return res(
      ctx.json({
        items: mockRepos,
        total_count: 2,
      }),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("RepoList", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  it("renders loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RepoList />
      </QueryClientProvider>,
    )
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders repositories after loading", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RepoList />
      </QueryClientProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("repo-1")).toBeInTheDocument()
      expect(screen.getByText("repo-2")).toBeInTheDocument()
    })
  })

  it("handles API error gracefully", async () => {
    server.use(
      rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    render(
      <QueryClientProvider client={queryClient}>
        <RepoList />
      </QueryClientProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument()
    })
  })

  it("shows error popup when fetching next page fails", async () => {
    let requestCount = 0
    server.use(
      rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
        requestCount++
        if (requestCount === 1) {
          return res(ctx.json({ items: mockRepos, total_count: 4 }))
        }
        return res(ctx.status(500))
      }),
    )

    render(
      <QueryClientProvider client={queryClient}>
        <RepoList />
      </QueryClientProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText("repo-1")).toBeInTheDocument()
    })

    // Trigger next page load
    const target = document.querySelector('[ref="targetRef"]')
    if (target) {
      const intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
        entries[0].isIntersecting && entries[0].target.dispatchEvent(new CustomEvent("intersect"))
      }
      intersectionObserverCallback([{ isIntersecting: true, target } as unknown as IntersectionObserverEntry])
    }

    await waitFor(() => {
      expect(screen.getByText(/failed to load more repositories/i)).toBeInTheDocument()
    })
  })

  it("matches snapshot when loaded", async () => {
    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <RepoList />
      </QueryClientProvider>,
    )

    await waitFor(() => {
      expect(tree.toJSON()).toMatchSnapshot()
    })
  })
})

