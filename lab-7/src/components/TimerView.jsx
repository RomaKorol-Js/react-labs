import { formatTime } from '../formatTime'

/**
 * Простий (presentational) компонент таймера: лише показує те, що отримав у
 * props, і викликає передані обробники. Власного стану й ефектів не має.
 *
 * Використання:
 *   <TimerView
 *     method={method}
 *     secondsLeft={175}
 *     status="running"   // 'idle' | 'running' | 'paused' | 'done'
 *     onStart={…}
 *     onPause={…}
 *     onReset={…}
 *   />
 *
 * Вимоги — у тестах tests/TimerView.test.jsx.
 */
export default function TimerView({
  method,
  secondsLeft,
  status,
  onStart,
  onPause,
  onReset,
}) {
  // console.log(secondsLeft)
  // console.log(method)
  // console.log(status !== 'done', status !== 'idle', status)
  return (
    <article className="brew-timer" aria-labelledby={`${method.id}-title`}>
      <h3 id={`${method.id}-title`}>{method.name}</h3>
      <p>{method.recipe}</p>
      <p className="time" role="timer">
        {formatTime(secondsLeft)}
      </p>
      <p role="status">{status === 'done' ? 'Готово! Час пити каву.' : ''}</p>
      <div className="timer-controls">
        <button
          hidden={status !== 'idle' && status !== 'paused'}
          type="button"
          onClick={onStart}
        >
          {secondsLeft === method.seconds ? 'Старт' : 'Продовжити'}
        </button>
        <button hidden={status !== 'running'} type="button" onClick={onPause}>
          Пауза
        </button>
        <button type="button" hidden={status === 'idle'} onClick={onReset}>
          {status !== 'done' ? 'Скинути' : 'Спочатку'}
        </button>
      </div>
    </article>
  )
  // throw new Error('Not implemented: TimerView')
}
