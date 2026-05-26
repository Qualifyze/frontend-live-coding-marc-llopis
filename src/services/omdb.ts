import type { Film, FilmDetail, SearchResponse } from '../types/film'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com'

export async function searchFilms(filmQuery: string): Promise<Film[]> {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(filmQuery)}&type=movie`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('We have a problem :( Please try again.')
  }

  const data: SearchResponse = await response.json()
  console.log(data)

  if (data.Response === 'False') {
    if (data.Error === 'Movie not found!') return []
    throw new Error(data.Error ?? 'Something went wrong, sorry!')
  }

  return data.Search
}

export async function getFilmDetail(imdbID: string): Promise<FilmDetail> {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('We have a problem :( Please try again.')
  }

  const data: FilmDetail = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'Oops! Film details not found.')
  }

  return data
}
