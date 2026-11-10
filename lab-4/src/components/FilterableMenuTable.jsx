import { useEffect, useState } from 'react'
import MenuTable from './MenuTable'
import SearchBar from './SearchBar'

export default function FilterableMenuTable({ menu }) {
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
    <>
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
    </>
  )
}
