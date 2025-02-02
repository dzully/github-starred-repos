import { useEffect, useRef, useState } from "react"

export const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false)
  const observerRef = useRef<IntersectionObserver>()
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && !isFetching) {
        setIsFetching(true)
        callback()
      }
    }, options)

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, isFetching])

  return { targetRef, isFetching, setIsFetching }
}

