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
              <tr
                key={item.id}
                className={item.available ? 'item' : 'item unavailable'}
              >
                <th scope="row">
                  {item.name}
                  {!item.available && ' — немає'}
                </th>
                <td>{item.price} грн</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </main>
  )
}
