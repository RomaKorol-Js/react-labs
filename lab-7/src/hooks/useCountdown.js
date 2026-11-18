/**
 * Зворотний відлік від `totalSeconds` до нуля, по секунді.
 *
 * Використання:
 *   const { secondsLeft, isRunning, start, pause, reset } = useCountdown(180)
 *
 * Вимоги — у тестах tests/useCountdown.test.jsx.
 */
export function useCountdown(secondsLeft) {
  const isRunning = secondsLeft <= 0

  if (isRunning) {
    secondsLeft -= 1
  }
  if (secondsLeft === 0) return secondsLeft
  // console.log(secondsLeft)

  return [secondsLeft, isRunning]
  // throw new Error('Not implemented: useCountdown')
}
