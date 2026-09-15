import { useEffect, useState } from 'react'

export function useSimulatedLoad(delayMs = 420) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), delayMs)
    return () => window.clearTimeout(timer)
  }, [delayMs])

  return loading
}
