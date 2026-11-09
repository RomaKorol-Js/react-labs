import MenuItemRow from './MenuItemRow'

export default function MenuCategory({ category }) {
  return (
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
  )
}
