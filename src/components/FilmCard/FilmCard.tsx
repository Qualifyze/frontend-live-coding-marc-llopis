import { useState, useCallback } from 'react'
import styles from './FilmCard.module.scss'

import type { Film } from '../../types/film'
import { Modal } from '../Modal'
import { FilmDetailContent } from '../FilmDetailContent'
import { useFilmDetail } from '../../hooks/useFilmDetail'
import { POSTER_PLACEHOLDER } from '../../constants'

interface FilmCardProps {
  film: Film
}

export function FilmCard({ film }: FilmCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { detail, isLoading, error, fetch } = useFilmDetail()

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    fetch(film.imdbID)
  }, [film.imdbID, fetch])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <article className={styles.card}>
        <img
          src={film.Poster !== 'N/A' ? film.Poster : POSTER_PLACEHOLDER}
          alt={`${film.Title} poster`}
          className={styles.poster}
          onError={(e) => {
            e.currentTarget.src = POSTER_PLACEHOLDER
          }}
        />
        <div className={styles.info}>
          <div>
            <h2 className={styles.title}>{film.Title}</h2>
            <span className={styles.year}>{film.Year}</span>
          </div>
          <button onClick={handleOpen} className={styles.detailsButton}>
            View details
          </button>
        </div>
      </article>

      <Modal isOpen={isOpen} onClose={handleClose} title={film.Title}>
        <FilmDetailContent
          detail={detail}
          isLoading={isLoading}
          error={error}
        />
      </Modal>
    </>
  )
}
