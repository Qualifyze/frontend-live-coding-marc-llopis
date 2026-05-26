import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { useFilmSearch } from './useFilmSearch'
import * as omdbService from '../services/omdb'
import { mockFilmSearchResults } from '../mocks/filmSearchResults'

vi.mock('./useDebounce', () => ({ useDebounce: <T>(value: T) => value }))
vi.mock('../services/omdb')

describe('useFilmSearch hook', () => {
  afterEach(() => vi.clearAllMocks())

  it('returns empty results for queries smaller than 2 characters', () => {
    const { result } = renderHook(() => useFilmSearch('l'))
    expect(result.current.films).toEqual([])
    expect(result.current.isLoading).toBe(false)
  })

  it('sets loading state while fetching', async () => {
    vi.mocked(omdbService.searchFilms).mockResolvedValue(
      mockFilmSearchResults.Search
    )
    const { result } = renderHook(() => useFilmSearch('lord'))
    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('returns films on a successful search', async () => {
    vi.mocked(omdbService.searchFilms).mockResolvedValue(
      mockFilmSearchResults.Search
    )
    const { result } = renderHook(() => useFilmSearch('lord'))
    await waitFor(() => {
      expect(result.current.films).toHaveLength(
        mockFilmSearchResults.Search.length
      )
      expect(result.current.error).toBeNull()
    })
  })

  it('creates an error and clears films when the API is not working', async () => {
    vi.mocked(omdbService.searchFilms).mockRejectedValue(
      new Error('Network error')
    )
    const { result } = renderHook(() => useFilmSearch('lord'))
    await waitFor(() => {
      expect(result.current.error).toBe('Network error')
      expect(result.current.films).toEqual([])
    })
  })
})
