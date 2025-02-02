import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchGithubRepos, type GithubRepo } from '@/shared/services/github'

export const useGithubRepos = () => {
  return useInfiniteQuery<GithubRepo[], Error>({
    queryKey: ['githubRepos'],
    queryFn: ({ pageParam = 1 }) => fetchGithubRepos(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1
    },
    initialPageParam: 1,
  })
}
