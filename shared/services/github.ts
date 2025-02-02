export interface GithubRepo {
  id: number
  name: string
  description: string
  stargazers_count: number
  owner: {
    login: string
    avatar_url: string
  }
  html_url: string
}

export interface GithubSearchResponse {
  items: GithubRepo[]
  total_count: number
}

export const fetchGithubRepos = async (page = 1): Promise<GithubRepo[]> => {
  const date = new Date()
  date.setDate(date.getDate() - 10)
  const formattedDate = date.toISOString().split("T")[0]

  const response = await fetch(
    `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${page}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch repos")
  }

  const data = (await response.json()) as GithubSearchResponse
  return data.items
}

