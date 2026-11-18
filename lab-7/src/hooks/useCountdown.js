import { useEffect, useState } from 'react'

/**
 * Зворотний відлік від `totalSeconds` до нуля, по секунді.
 *
 * Використання:
 *   const { secondsLeft, isRunning, start, pause, reset } = useCountdown(180)
 *
 * Вимоги — у тестах tests/useCountdown.test.jsx.
 */
export function useCountdown(totalSeconds) {
  const [isRunning, setIsRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const start = () => {
    setIsRunning(true)
  }
  const pause = () => {
    setIsRunning(false)
  }
  const reset = () => {
    setIsRunning(false)
    setSecondsLeft(totalSeconds)
  }

  useEffect(() => {
    if (!isRunning) return

    const secondTimer = setInterval(() => {
      setSecondsLeft((ts) => {
        if (ts <= 1) {
          setIsRunning(false)
          return 0
        } else {
          return ts - 1
        }
      })
    }, 1000)
    return () => {
      clearInterval(secondTimer)
    }
  }, [isRunning])

  return { secondsLeft, isRunning, start, pause, reset }
}
