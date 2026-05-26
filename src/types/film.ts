export interface Film {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface SearchResponse {
  Search: Film[]
  totalResults: string
  Response: 'True' | 'False'
  Error?: string
}

export interface FilmRating {
  Source: string
  Value: string
}

export interface FilmDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  Awards: string
  Poster: string
  Ratings: FilmRating[]
  imdbRating: string
  imdbVotes: string
  imdbID: string
  BoxOffice: string
  Response: 'True' | 'False'
  Error?: string
}
