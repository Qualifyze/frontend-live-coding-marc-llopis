import { useState, useCallback } from 'react'
import { getFilmDetail } from '../services/omdb'
import type { FilmDetail } from '../types/film'

interface UseFilmDetailResult {
  detail: FilmDetail | null
  isLoading: boolean
  error: string | null
  fetch: (imdbID: string) => void
}

export function useFilmDetail(): UseFilmDetailResult {
  const [detail, setDetail] = useState<FilmDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async (imdbID: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getFilmDetail(imdbID)
      setDetail(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { detail, isLoading, error, fetch }
}
