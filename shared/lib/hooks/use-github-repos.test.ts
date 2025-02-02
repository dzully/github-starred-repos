import { renderHook, waitFor } from "@testing-library/react"
import { useGithubRepos } from "./use-github-repos"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { rest } from "msw"
import { setupServer } from "msw/node"

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
]

const server = setupServer(
  rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) || 1
    return res(
      ctx.json({
        items: page === 1 ? mockRepos : [],
        total_count: mockRepos.length,
      }),
    )
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("useGithubRepos", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it("fetches initial data successfully", async () => {
    const { result } = renderHook(() => useGithubRepos(), { wrapper })

    expect(result.current.status).toBe("loading")

    await waitFor(() => {
      expect(result.current.status).toBe("success")
    })

    expect(result.current.data?.pages[0]).toEqual(mockRepos)
  })

  it("handles error state", async () => {
    server.use(
      rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    const { result } = renderHook(() => useGithubRepos(), { wrapper })

    await waitFor(() => {
      expect(result.current.status).toBe("error")
    })
  })

  it("handles pagination correctly", async () => {
    const { result } = renderHook(() => useGithubRepos(), { wrapper })

    await waitFor(() => {
      expect(result.current.status).toBe("success")
    })

    await result.current.fetchNextPage()

    expect(result.current.hasNextPage).toBe(false)
  })
})

