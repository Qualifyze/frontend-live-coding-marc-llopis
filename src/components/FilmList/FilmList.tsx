import type { Film } from '../../types/film'
import { FilmCard } from '../FilmCard'
import styles from './FilmList.module.scss'

interface FilmListProps {
  films: Film[]
  query: string
}

export function FilmList({ films, query }: FilmListProps) {
  if (films.length === 0) {
    return (
      <p className={styles.empty}>
        No results found for{' '}
        <span className={styles.emptyHighlight}>"{query}"</span>
      </p>
    )
  }

  return (
    <section aria-label="Search results">
      <ul className={styles.list}>
        {films.map((film) => (
          <li key={film.imdbID}>
            <FilmCard film={film} />
          </li>
        ))}
      </ul>
    </section>
  )
}
