import BeanPage from '../route/bean/BeanPage.jsx'
import CartPage from '../route/cart/CartPage.jsx'
import CatalogPage from '../route/catalog/CatalogPage.jsx'
import { useRoute } from '../shared/hooks/useRoute.js'
import AppHeader from './components/AppHeader.jsx'
import NotFound from '../shared/components/NotFound.jsx'

function renderPage(route) {
  switch (route.name) {
    case 'catalog':
      return <CatalogPage />
    case 'bean':
      return <BeanPage key={route.id} beanId={route.id} />
    case 'cart':
      return <CartPage />
    default:
      return <NotFound />
  }
}

export default function App() {
  const route = useRoute()

  return (
    <>
      <AppHeader />
      <main className="app">{renderPage(route)}</main>
    </>
  )
}
