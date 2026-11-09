import { menu } from './data.js'
import MenuItemRow from '../src/components/MenuItemRow.jsx'
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
          <tbody key={category.id}>
            <tr className="category">
              <th colSpan={2} scope="rowgroup">
                {category.name} ({category.items.length})
              </th>
            </tr>
            {category.items.map((item) => (
              <MenuItemRow key={item.id} item={item} />
            ))}
          </tbody>
        ))}
      </table>
    </main>
  )
}
