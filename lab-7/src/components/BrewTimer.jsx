import { useEffect, useState } from 'react'
import TimerView from './TimerView.jsx'

export default function BrewTimer({ method }) {
  const [secondsLeft, setSecondsLeft] = useState(method.seconds)
  const [status, setStatus] = useState('idle')
  const [isRunning, setIsRunning] = useState(false)
  console.log(secondsLeft)
  useEffect(() => {
    if (!isRunning) return
    setInterval(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)
  }, [isRunning])

  if (secondsLeft === 0) {
    setStatus('done')
    return
  }
  const handleStart = () => {
    setStatus('running')
    setIsRunning(true)
  }
  const handlePause = () => {
    setStatus('paused')
    setIsRunning(false)
  }
  const handleReset = () => {
    setIsRunning(false)
    setSecondsLeft(method.seconds)
  }
  console.log(isRunning)
  return (
    <TimerView
      method={method}
      secondsLeft={secondsLeft}
      status={status}
      onStart={handleStart}
      onPause={handlePause}
      onReset={handleReset}
    />
  )
}
