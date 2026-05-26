import { type ChangeEvent } from 'react'
import styles from './SearchInput.module.scss'

import clsx from 'clsx'

type InputState = 'default' | 'error'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  state?: InputState
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search for a film title...',
  disabled = false,
  state = 'default',
}: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <div className={styles.icon}>
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          id="film-search"
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          aria-label="Search for a film by title"
          className={clsx(styles.input, {
            [styles.inputError]: state === 'error',
          })}
        />
      </div>
    </div>
  )
}
