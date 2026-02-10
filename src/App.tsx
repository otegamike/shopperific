// React Router
import { Routes, Route } from 'react-router-dom'

// Context
import { AuthContextProvider } from './context/AuthContext'

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



function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth/login" element={<SignIn form="login" />} />
          <Route path="/auth/register" element={<SignIn form="register" />} />
          <Route path="/auth/verify-email" element={<SignIn form="verifyEmail"/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shops" element={<Shops />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<RequireSeller />}>
              <Route path="/new-shop" element={<NewShop />} />
            </Route>
            <Route path="/become-seller" element={<BecomeSeller />} />
            {DashboardRoutes()}
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
