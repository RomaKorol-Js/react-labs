import { createContext, useContext, useId, useState } from 'react'

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
// const id = useId()

function useTabs() {
  const tab = useContext(TabsContext)

  if (tab === undefined) {
    throw new Error('немає такої вкладки у <Tabs>')
  }
  return tab
}

export default function Tabs({ children, defaultValue }) {
  const id = useId()
  const [tab, setTab] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ tab, setTab, id }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}
Tabs.Tab = function Tab({ children, value }) {
  const { tab, setTab, id: tabsId } = useTabs()
  const tabId = `${tabsId}-tab-${value}`
  const panelId = `${tabsId}-panel-${value}`

  const handleTabControl = (e) => {
    let target = null
    if (e.key === 'ArrowLeft') {
      target =
        e.currentTarget.previousElementSibling ||
        e.currentTarget.parentNode.children[
          e.currentTarget.parentNode.children.length - 1
        ]
      e.preventDefault()
    }
    if (e.key === 'ArrowRight') {
      target =
        e.currentTarget.nextElementSibling ||
        e.currentTarget.parentNode.children[0]
      e.preventDefault()
    }
    if (e.key === 'End') {
      target =
        e.currentTarget.parentNode.children[
          e.currentTarget.parentNode.children.length - 1
        ]
      e.preventDefault()
    }
    if (e.key === 'Home') {
      target = e.currentTarget.parentNode.children[0]
      e.preventDefault()
    }
    if (target) {
      target.focus()

      setTab(target.getAttribute('value'))
    }
  }

  const isSelected = tab === value
  return (
    <button
      role="tab"
      aria-selected={isSelected}
      id={tabId}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      onKeyDown={handleTabControl}
      type="button"
      onClick={() => setTab(value)}
      value={value}
    >
      {children}
    </button>
  )
}
Tabs.List = function List({ 'aria-label': value, children }) {
  return (
    <div role="tablist" aria-label={value} className="tab-list">
      {children}
    </div>
  )
}
Tabs.Panel = function Panel({ value, children }) {
  const { tab, id: tabsId } = useTabs()
  const tabId = `${tabsId}-tab-${value}`
  const panelId = `${tabsId}-panel-${value}`
  return (
    <div
      hidden={tab !== value}
      role="tabpanel"
      id={panelId}
      tabIndex={0}
      aria-labelledby={tabId}
      className={tab === value ? 'active' : ''}
      type="button"
      value={tab}
    >
      {children}
    </div>
  )
}
// throw new Error('Not implemented: Tabs')
