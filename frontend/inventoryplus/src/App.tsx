import Card from './components/card'
import { SidebarNavigationSlimDemo } from './components/sidebar'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <SidebarNavigationSlimDemo />
      <main className="app-main">
        <Card
          title="Product Name"
          category="Category"
          quantity={0}
          price={0.00}
          sku="SKU-0000"
          status="in-stock"
          onEdit={() => console.log('edit')}
          onDelete={() => console.log('delete')}
        />
      </main>
    </div>
  )
}

export default App
