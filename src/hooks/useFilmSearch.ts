import { useState, useEffect } from 'react'
import { searchFilms } from '../services/omdb'
import { useDebounce } from './useDebounce'

import type { Film } from '../types/film'
import { MIN_QUERY_LENGTH, DEBOUNCE_DELAY } from '../constants'

interface UseFilmSearchResult {
  films: Film[]
  isLoading: boolean
  error: string | null
  warning: string | null
}

export function useFilmSearch(query: string): UseFilmSearchResult {
  const [films, setFilms] = useState<Film[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_DELAY)

  useEffect(() => {
    if (debouncedQuery.length < MIN_QUERY_LENGTH) {
      setFilms([])
      setError(null)
      setWarning(null)
      return
    }

    const fetchFilms = async () => {
      setIsLoading(true)
      setError(null)
      setWarning(null)

      try {
        const films = await searchFilms(debouncedQuery)
        setFilms(films)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Somethhing went wrong.'
        if (message.includes('Too many results')) {
          setWarning('Too many results, be more specific!')
          setFilms([])
        } else {
          setError(message)
          setFilms([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilms()
  }, [debouncedQuery])

  return { films, isLoading, error, warning }
}
