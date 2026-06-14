import { useState } from 'react'
import Card from './components/card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
    </>
  )
}

export default App
