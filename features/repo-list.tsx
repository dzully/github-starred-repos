import { useCallback, useEffect, useRef, useState } from "react"
import { RepoCard } from "@/entities/repo-card"
import { motion, AnimatePresence } from "framer-motion"
import { useGithubRepos } from "@/shared/lib/hooks/use-github-repos"
import { LoadingSpinner } from "@/shared/components/loading-spinner"
import { ErrorMessage } from "@/shared/components/error-message"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const RepoList = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useGithubRepos()

  const [fetchError, setFetchError] = useState<string | null>(null)

  const observerRef = useRef<IntersectionObserver>()
  const targetRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage && !fetchError) {
        fetchNextPage().catch((err) => {
          setFetchError("Failed to load more repositories. Please try again.")
        })
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, fetchError],
  )

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }

    observerRef.current = new IntersectionObserver(handleObserver, options)

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver])

  if (status === "loading") {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === "error" && !data) {
    return <ErrorMessage message={(error as Error).message} onRetry={() => refetch()} />
  }

  const repos = data?.pages.flat() ?? []

  const retryFetch = () => {
    setFetchError(null)
    fetchNextPage().catch((err) => {
      setFetchError("Failed to load more repositories. Please try again.")
    })
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          data-testid="repo-list"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex flex-wrap gap-6"
        >
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
            >
              <RepoCard
                name={repo.name}
                description={repo.description || "No description available"}
                stars={repo.stargazers_count.toLocaleString()}
                owner={{
                  name: repo.owner.login,
                  avatar: repo.owner.avatar_url,
                }}
                url={repo.html_url}
              />
              {index === repos.length - 1 && hasNextPage && !fetchError && <div ref={targetRef} className="h-1" />}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <LoadingSpinner />
        </div>
      )}

      {!hasNextPage && repos.length > 0 && (
        <div className="text-center text-gray-500 mt-6">No more repositories to load.</div>
      )}

      {fetchError && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Alert variant="destructive" className="w-96 max-w-[calc(100vw-2rem)]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{fetchError}</AlertDescription>
            <div className="mt-2 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={retryFetch}>
                Retry
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setFetchError(null)}>
                Dismiss
              </Button>
            </div>
          </Alert>
        </motion.div>
      )}
    </>
  )
}

