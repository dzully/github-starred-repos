import { fetchGithubRepos } from "./github"
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
    return res(ctx.json({ items: mockRepos, total_count: 1 }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("fetchGithubRepos", () => {
  it("fetches repositories successfully", async () => {
    const repos = await fetchGithubRepos()
    expect(repos).toEqual(mockRepos)
  })

  it("handles API errors", async () => {
    server.use(
      rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    await expect(fetchGithubRepos()).rejects.toThrow("Failed to fetch repos")
  })

  it("uses correct query parameters", async () => {
    let requestUrl: URL | null = null

    server.use(
      rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
        requestUrl = new URL(req.url)
        return res(ctx.json({ items: mockRepos, total_count: 1 }))
      }),
    )

    await fetchGithubRepos(2)

    expect(requestUrl?.searchParams.get("page")).toBe("2")
    expect(requestUrl?.searchParams.get("sort")).toBe("stars")
    expect(requestUrl?.searchParams.get("order")).toBe("desc")
  })
})

