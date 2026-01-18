// React Router
import { Routes, Route } from 'react-router-dom'
// Styles
import './App.css'

// Pages
import Home from './pages/Home'
import SignIn from './pages/Auth'
import Products from './pages/products/Products'
import Shops from './pages/shops/Shops'
import NewShop from './pages/shops/NewShop'
import Dashboard from './pages/dashboard/dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shops" element={<Shops/>} />
        <Route path="/new-shop" element={<NewShop/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  )
}

export default App
