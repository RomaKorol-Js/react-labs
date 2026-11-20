import { track } from '../analytics'

/**
 * Компонент вищого порядку (HOC): отримує компонент і повертає новий, який
 * рендерить `Component` з тими самими props, а під час кліку ще й надсилає
 * подію `event` в аналітику (`track` з src/analytics.js).
 *
 * Використання:
 *   const AddToCartButton = withAnalytics(Button, 'add_to_cart')
 *
 *   <AddToCartButton analyticsData={{ productId }} onClick={add}>
 *     Додати в кошик
 *   </AddToCartButton>
 *
 * Поки що повертає `Component` без змін. Вимоги — у тестах
 * tests/withAnalytics.test.jsx.
 */
export function withAnalytics(Component, productId) {
  function withAnalytics({ analyticsData, children, onClick, ...prop }) {
    const onButtonClick = (e) => {
      track(productId, analyticsData)
      onClick?.(e)
    }
    return (
      <Component {...prop} onClick={onButtonClick}>
        {children}
      </Component>
    )
  }
  withAnalytics.displayName = `withAnalytics(${Component.displayName || Component.name || 'Component'})`

  return withAnalytics
  // return {<Component onclick={onButtonClick} />}
}
