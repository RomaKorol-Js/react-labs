import { useState } from 'react'

/**
 * Показує перші `step` елементів з `items` і кнопку, що показує наступні.
 *
 * Використання:
 *   <ShowMore items={reviews} step={3}>
 *     {(visibleItems) => <ul>…</ul>}
 *   </ShowMore>
 *
 * Вимоги — у тестах tests/ShowMore.test.jsx.
 */
export default function ShowMore({ items, step, children }) {
  const [count, setCount] = useState(step)
  const visibleItems = items.slice(0, count)
  const hiddenCount = items.length - visibleItems.length

  if (items.length <= step) {
    return <>{children(visibleItems)}</>
  }
  return (
    <>
      {children(visibleItems)}
      {hiddenCount > 0 ? (
        <button
          type="button"
          className="show-more"
          onClick={() => setCount(count + step)}
        >
          Показати ще {Math.min(step, hiddenCount)}
        </button>
      ) : (
        <button
          type="button"
          className="show-more"
          onClick={() => setCount(step)}
        >
          Згорнути
        </button>
      )}
    </>
  )
  // throw new Error('Not implemented: ShowMore')
}
