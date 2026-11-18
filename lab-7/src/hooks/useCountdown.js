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
  // const isRunning = secondsLeft <= 0
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
    if (secondsLeft === 0) return secondsLeft
    setInterval(() => {
      setSecondsLeft(totalSeconds - 1)
    }, 1000)
  }, [isRunning])

  return { secondsLeft, isRunning, start, pause, reset }
  // throw new Error('Not implemented: useCountdown')
}
