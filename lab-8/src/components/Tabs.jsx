import { createContext, useContext, useState } from 'react'

/**
 * Вкладки — складений компонент (compound component): `Tabs` і його частини
 * `Tabs.List`, `Tabs.Tab` і `Tabs.Panel`. Вміст кожної частини приходить між
 * її тегами як `children`, а яка вкладка обрана, частини дізнаються з
 * контексту, який створює `Tabs`.
 *
 * Використання:
 *   <Tabs defaultValue="brew">
 *     <Tabs.List aria-label="Про каву">
 *       <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
 *       <Tabs.Tab value="reviews">Відгуки</Tabs.Tab>
 *     </Tabs.List>
 *     <Tabs.Panel value="brew">…</Tabs.Panel>
 *     <Tabs.Panel value="reviews">…</Tabs.Panel>
 *   </Tabs>
 *
 * Вимоги — у тестах tests/Tabs.children.test.jsx і tests/Tabs.a11y.test.jsx.
 */

const TabsContext = createContext()

function useTabs() {
  const tab = useContext(TabsContext)

  if (tab === undefined) {
    throw new Error('немає такої вкладки у <Tabs>')
  }
  return tab
}
export default function Tabs({ children, defaultValue }) {
  const [tab, setTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ tab, setTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}
Tabs.Tab = function Tab({ children, value }) {
  const { setTab } = useTabs()
  return (
    <button type="button" onClick={() => setTab(value)} value={value}>
      {children}
    </button>
  )
}
Tabs.List = function List({ 'aria-label': value, children }) {
  return (
    <div aria-label={value} className="tab-list">
      {children}
    </div>
  )
}
Tabs.Panel = function Panel({ value, children }) {
  const { tab } = useTabs()
  return (
    <div
      hidden={tab !== value}
      className={tab === value ? 'active' : ''}
      type="button"
      value={tab}
    >
      {children}
    </div>
  )
}
// throw new Error('Not implemented: Tabs')
