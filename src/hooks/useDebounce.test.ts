import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns the initial value', () => {
    const { result } = renderHook(() => useDebounce('Llopis', 400))
    expect(result.current).toBe('Llopis')
  })

  it('does not update before the delay happens', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: { value: 'Llopis' },
      }
    )
    rerender({ value: 'Marc' })
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('Llopis')
  })

  it('updates after the delay happens', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: { value: 'Llopis' },
      }
    )
    rerender({ value: 'Marc' })
    act(() => vi.advanceTimersByTime(400))
    expect(result.current).toBe('Marc')
  })
})
