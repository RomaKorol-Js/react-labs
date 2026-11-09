import MenuTable from './components/MenuTable.jsx'
import { menu } from './data.js'
export default function App() {
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>

      <search className="search-bar">
        <input
          type="search"
          placeholder="Пошук у меню"
          aria-label="Пошук у меню"
        />
        <label>
          <input type="checkbox" /> Лише в наявності
        </label>
      </search>

      <MenuTable menu={menu} />
    </main>
  )
}
