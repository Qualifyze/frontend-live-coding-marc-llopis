import { describe, it, expect, afterEach } from 'vitest'
import { searchFilms, getFilmDetail } from './omdb'
import { mockFilmSearchResults } from '../mocks/filmSearchResults'
import { mockFilmDetail } from '../mocks/filmDetail'

const mockFetch = (body: unknown, ok = true) => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok, json: async () => body } as Response)
  )
}

describe('omdb services for api calls', () => {
  afterEach(() => vi.unstubAllGlobals())

  describe('searchFilms', () => {
    it('returns films on a successful response', async () => {
      mockFetch(mockFilmSearchResults)
      const result = await searchFilms('lord')
      expect(result).toHaveLength(mockFilmSearchResults.Search.length)
      expect(result[0].imdbID).toBe(mockFilmSearchResults.Search[0].imdbID)
    })

    it('returns an empty array when no films are found', async () => {
      mockFetch({ Response: 'False', Error: 'Movie not found!' })
      const result = await searchFilms('randomLettersHGBABFCHU')
      expect(result).toEqual([])
    })

    it('throws an error message if the responnse fails', async () => {
      mockFetch({ Response: 'False', Error: 'Too many results.' })
      await expect(searchFilms('a')).rejects.toThrow('Too many results.')
    })

    it('throws a network error if rejected', async () => {
      mockFetch(null, false)
      await expect(searchFilms('lord')).rejects.toThrow('We have a problem')
    })
  })

  describe('getFilmDetail', () => {
    it('returns full film details on success', async () => {
      mockFetch(mockFilmDetail)
      const result = await getFilmDetail('tt0120737')
      expect(result.Title).toBe(mockFilmDetail.Title)
      expect(result.Director).toBe(mockFilmDetail.Director)
      expect(result.imdbRating).toBe(mockFilmDetail.imdbRating)
    })

    it('throws error if filmm details are not found', async () => {
      mockFetch({ Response: 'False', Error: 'Film details not found.' })
      await expect(getFilmDetail('randomLettersFQCGV')).rejects.toThrow(
        'Film details not found.'
      )
    })
  })
})
