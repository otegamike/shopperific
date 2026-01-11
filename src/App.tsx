import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/Auth'
import Products from './pages/products/Products'
import Shops from './pages/shops/Shops'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shops" element={<Shops/>} />
      </Routes>
    </>
  )
}

export default App
