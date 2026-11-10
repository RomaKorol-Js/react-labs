import SearchBar from './components/SearchBar.jsx'
import MenuTable from './components/MenuTable.jsx'
import CafeInfo from './components/CafeInfo.jsx'
import { menu } from './data.js'
import { useEffect, useState } from 'react'

export default function App() {
  const [filterText, setFilterText] = useState(
    () => localStorage.getItem('menu.filterText') ?? '',
  )
  const [inStockOnly, setInStockOnly] = useState(
    () => localStorage.getItem('menu.inStockOnly') === 'true',
  )

  useEffect(() => {
    localStorage.setItem('menu.filterText', filterText)
    localStorage.setItem('menu.inStockOnly', String(inStockOnly))
  }, [filterText, inStockOnly])

  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>
      <SearchBar
        value={filterText}
        checked={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <MenuTable
        menu={menu}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
      <CafeInfo />
    </main>
  )
}
