import { menu } from './data.js'
import MenuCategory from './components/MenuCategory.jsx'
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

      <table className="menu-table">
        <thead>
          <tr>
            <th scope="col">Позиція</th>
            <th scope="col">Ціна</th>
          </tr>
        </thead>
        {menu.map((category) => (
          <MenuCategory key={category.id} category={category} />
        ))}
      </table>
    </main>
  )
}
