import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { fetchGithubRepos } from './github'
import { http } from 'msw'
import { setupServer } from 'msw/node'
import { URL } from 'url'

const mockRepos = [
  {
    id: 1,
    name: 'repo-1',
    description: 'Description 1',
    stargazers_count: 1000,
    owner: {
      login: 'user1',
      avatar_url: 'https://example.com/avatar1.jpg',
    },
    html_url: 'https://github.com/user1/repo-1',
  },
]

const server = setupServer(
  http.get('https://api.github.com/search/repositories', () => {
    return Response.json({ items: mockRepos, total_count: 1 })
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetchGithubRepos', () => {
  it('fetches repositories successfully', async () => {
    const repos = await fetchGithubRepos()
    expect(repos).toEqual(mockRepos)
  })

  it('uses correct query parameters', async () => {
    let requestUrl: URL | null = null as any

    server.use(
      http.get(
        'https://api.github.com/search/repositories',
        ({ request: req }) => {
          requestUrl = new URL(req.url)
          return Response.json({ items: mockRepos, total_count: 1 })
        }
      )
    )

    await fetchGithubRepos(2)

    expect(requestUrl?.searchParams.get('page')).toBe('2')
    expect(requestUrl?.searchParams.get('sort')).toBe('stars')
    expect(requestUrl?.searchParams.get('order')).toBe('desc')
  })

  it('handles empty results', async () => {
    server.use(
      http.get('https://api.github.com/search/repositories', () => {
        return Response.json({ items: [], total_count: 0 })
      })
    )

    const repos = await fetchGithubRepos()
    expect(repos).toEqual([])
  })
})
