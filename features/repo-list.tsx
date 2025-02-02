import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useGithubRepos } from '@/shared/lib/hooks/use-github-repos'
import { useInfiniteScroll } from '@/shared/lib/hooks/use-infinite-scroll'
import { RepoCard } from '@/entities/repo-card'
import { LoadingSpinner } from '@/shared/components/loading-spinner'
import { ErrorMessage } from '@/shared/components/error-message'

export const RepoList = () => {
  const {
    data,
    error: queryError,
    fetchNextPage,
    hasNextPage,
    status,
    refetch,
  } = useGithubRepos()

  const handleFetchMore = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  const {
    targetRef,
    isFetching,
    error: scrollError,
  } = useInfiniteScroll(handleFetchMore, {
    disabled: !hasNextPage,
    threshold: 0.5,
  })

  if (status === 'pending') {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'error' && !data) {
    return (
      <ErrorMessage
        message={queryError?.message || 'Failed to load repositories'}
        onRetry={refetch}
      />
    )
  }

  const repos = data?.pages.flat() ?? []

  return (
    <motion.div layout className="flex flex-wrap gap-4 md:gap-6">
      {repos.map((repo, index) => (
        <motion.div
          key={repo.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
        >
          <RepoCard
            name={repo.name}
            description={repo.description}
            stars={repo.stargazers_count.toLocaleString()}
            owner={repo.owner}
            url={repo.html_url}
          />
          {index === repos.length - 1 && (
            <div ref={targetRef} className="h-px w-full" />
          )}
        </motion.div>
      ))}
      {isFetching && (
        <div className="col-span-full flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
      {scrollError && (
        <div className="col-span-full">
          <ErrorMessage
            message={scrollError.message}
            onRetry={handleFetchMore}
          />
        </div>
      )}
    </motion.div>
  )
}
