import { useState } from 'react'
import { SearchInput } from './components/SearchInput'
import { FilmList } from './components/FilmList'
import { useFilmSearch } from './hooks/useFilmSearch'
import styles from './App.module.scss'

export default function App() {
  const [filmQuery, setFilmQuery] = useState('')
  const { films, isLoading, error, warning } = useFilmSearch(filmQuery)

  const showList = films.length > 0 && !isLoading && !error
  const showEmpty =
    !isLoading &&
    !error &&
    !warning &&
    filmQuery.trim().length >= 2 &&
    films.length === 0

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logoText}>Qualifyze</span>
          <span className={styles.headerBadge}>Marc Llopis Tech Challenge</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Qualifyze Film Search</h1>
          <p className={styles.subtitle}>
            Search for any film by title and explore any movie!
          </p>
        </div>

        <SearchInput
          value={filmQuery}
          onChange={setFilmQuery}
          state={error ? 'error' : 'default'}
        />

        <div className={styles.results}>
          {isLoading && (
            <div
              className={styles.spinner}
              role="status"
              aria-label="Loading results"
            >
              <div className={styles.spinnerIcon} />
            </div>
          )}

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          {warning && <p className={styles.warning}>{warning}</p>}

          {(showList || showEmpty) && (
            <FilmList films={films} query={filmQuery.trim()} />
          )}
        </div>
      </main>
    </div>
  )
}
