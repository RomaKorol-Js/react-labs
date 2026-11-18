// import { useState } from 'react'
import { useShowMore } from '../hooks/useShowMore'

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
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    items,
    step,
  )

  if (items.length <= step) {
    return <>{children(visibleItems)}</>
  }
  return (
    <>
      {children(visibleItems)}
      {hiddenCount > 0 ? (
        <button type="button" className="show-more" onClick={showMore}>
          Показати ще {Math.min(step, hiddenCount)}
        </button>
      ) : (
        <button type="button" className="show-more" onClick={collapse}>
          Згорнути
        </button>
      )}
    </>
  )
  // throw new Error('Not implemented: ShowMore')
}
