import { useEffect, useState } from 'react'

export interface AsyncData<T> {
  data: T
  isLoading: boolean
  hasError: boolean
}

export function useAsyncData<T>(load: () => Promise<T>, initialData: T): AsyncData<T> {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isActive = true

    load()
      .then((loadedData) => {
        if (isActive) setData(loadedData)
      })
      .catch(() => {
        if (isActive) setHasError(true)
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [load])

  return { data, isLoading, hasError }
}