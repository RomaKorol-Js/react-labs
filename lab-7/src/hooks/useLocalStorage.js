import { useEffect, useState } from 'react'

/**
 * Стан, що зберігається в localStorage під ключем `key` у форматі JSON.
 *
 * Використання, як у useState:
 *   const [value, setValue] = useLocalStorage('grind', 'beans')
 *
 * Вимоги — у тестах tests/useLocalStorage.test.jsx.
 */
export function useLocalStorage(value, defaultvalue) {
  const [currentValue, setCurrentValue] = useState(() => {
    try {
      const local_value = localStorage.getItem(value)
      return local_value === null ? defaultvalue : JSON.parse(local_value)
    } catch {
      return defaultvalue
    }
  })
  useEffect(() => {
    localStorage.setItem(value, JSON.stringify(currentValue))
  }, [value, currentValue])
  return [currentValue, setCurrentValue]
}
