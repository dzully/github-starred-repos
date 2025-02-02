import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchGithubRepos, type GithubRepo } from "@/shared/services/github"

export const useGithubRepos = () => {
  return useInfiniteQuery<GithubRepo[]>({
    queryKey: ["githubRepos"],
    queryFn: ({ pageParam = 1 }) => fetchGithubRepos(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1
    },
  })
}

