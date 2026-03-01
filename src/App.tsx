// React Router
import { Routes, Route } from 'react-router-dom'

// Context
import { AuthContextProvider } from './context/AuthContext'
import { CartContextProvider } from './context/CartContext'

// Components
import ProtectedRoute from './components/protectedRoutes/protectedRoutes'
import RequireSeller from './components/protectedRoutes/RequireSeller'

// Styles
import './App.css'

// Pages
import Home from './pages/Home'
import SignIn from './pages/Auth'
import Products from './pages/products/Products'
import Product from './pages/products/Product'
import Shops from './pages/shops/Shops'
import NewShop from './pages/shops/NewShop'
import DashboardRoutes from './pages/dashboard/Routes'
import BecomeSeller from './pages/sellers/BecomeSeller'
import Categories from './pages/products/Categories'
import Category from './pages/products/Category'
import ShopDetails from './pages/shops/ShopDetails'

function App() {
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth/login" element={<SignIn form="login" />} />
            <Route path="/auth/register" element={<SignIn form="register" />} />
            <Route path="/auth/verify-email" element={<SignIn form="verifyEmail"/>} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/categories" element={<Categories />} />
            <Route path="/products/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/shops/shop/:shopId" element={<ShopDetails />} />

            <Route path="/shops" element={<Shops />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<RequireSeller />}>
                <Route path="/new-shop" element={<NewShop />} />
              </Route>
              <Route path="/become-seller" element={<BecomeSeller />} />
              {DashboardRoutes()}
            </Route>
          </Routes>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
