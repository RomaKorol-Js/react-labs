// import { useState } from 'react'
import TimerView from './TimerView.jsx'
import { useCountdown } from '../hooks/useCountdown.js'

export default function BrewTimer({ method }) {
  console.log(useCountdown(method.seconds))
  const { secondsLeft, isRunning, start, pause, reset } = useCountdown(
    method.seconds,
  )
  console.log(secondsLeft)
  const status =
    secondsLeft === 0
      ? 'done'
      : isRunning
        ? 'running'
        : secondsLeft === method.seconds
          ? 'idle'
          : 'paused'
  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={status}
      onStart={start}
      onPause={pause}
      onReset={reset}
    />
  )
}
