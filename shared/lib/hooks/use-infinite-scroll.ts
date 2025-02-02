import { useEffect, useRef, useState, useCallback } from 'react'
import { useIsMobile } from '@/shared/lib/hooks/use-mobile'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
  disabled?: boolean
}

export const useInfiniteScroll = (
  callback: () => Promise<void>,
  options: UseInfiniteScrollOptions = {}
) => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const observerRef = useRef<IntersectionObserver>()
  const targetRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const { threshold = 0.5, rootMargin = '100px', disabled = false } = options

  const handleIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && !isFetching && !disabled) {
        try {
          setIsFetching(true)
          await callback()
          setError(null)
        } catch (err) {
          setError(
            err instanceof Error ? err : new Error('Failed to fetch data')
          )
        } finally {
          setIsFetching(false)
        }
      }
    },
    [callback, isFetching, disabled]
  )

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: isMobile ? '50px' : rootMargin,
      threshold,
    }

    observerRef.current = new IntersectionObserver(handleIntersection, options)

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [handleIntersection, rootMargin, threshold, isMobile])

  const reset = useCallback(() => {
    setIsFetching(false)
    setError(null)
  }, [])

  return { targetRef, isFetching, error, reset }
}
