import { type ReactNode } from 'react'
import styles from './FilmDetailContent.module.scss'

import type { FilmDetail } from '../../types/film'
import { POSTER_PLACEHOLDER } from '../../constants'

interface FilmDetailContentProps {
  detail: FilmDetail | null
  isLoading: boolean
  error: string | null
}

export function FilmDetailContent({
  detail,
  isLoading,
  error,
}: FilmDetailContentProps) {
  if (isLoading) {
    return (
      <div
        className={styles.loader}
        role="status"
        aria-label="Loading film details"
      >
        <div className={styles.spinner} />
      </div>
    )
  }

  if (error) {
    return (
      <p className={styles.error} role="alert">
        {error}
      </p>
    )
  }

  if (!detail) return null

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <img
          src={detail.Poster !== 'N/A' ? detail.Poster : POSTER_PLACEHOLDER}
          alt={`${detail.Title} poster`}
          className={styles.poster}
          onError={(e) => {
            e.currentTarget.src = POSTER_PLACEHOLDER
          }}
        />
        <div className={styles.meta}>
          <h3 className={styles.title}>{detail.Title}</h3>
          <div className={styles.badges}>
            <Badge>{detail.Year}</Badge>
            <Badge>{detail.Runtime}</Badge>
            <Badge>{detail.Rated}</Badge>
          </div>
          {detail.imdbRating !== 'N/A' && (
            <div className={styles.rating}>
              <svg
                className={styles.starIcon}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className={styles.ratingScore}>{detail.imdbRating}</span>
              <span className={styles.ratingMeta}>
                / 10 · {detail.imdbVotes} votes
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.plot}>{detail.Plot}</p>
        <dl className={styles.details}>
          <DetailRow label="Genre" value={detail.Genre} />
          <DetailRow label="Director" value={detail.Director} />
          <DetailRow label="Cast" value={detail.Actors} />
          {detail.Awards !== 'N/A' && (
            <DetailRow label="Awards" value={detail.Awards} />
          )}
          {detail.BoxOffice !== 'N/A' && (
            <DetailRow label="Box Office" value={detail.BoxOffice} />
          )}
        </dl>
      </div>
    </div>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return <span className={styles.badge}>{children}</span>
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className={styles.detailLabel}>{label}</dt>
      <dd className={styles.detailValue}>{value}</dd>
    </>
  )
}
