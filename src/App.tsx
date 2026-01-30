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
import Shops from './pages/shops/Shops'
import NewShop from './pages/shops/NewShop'
import Dashboard from './pages/dashboard/dashboard'
import BecomeSeller from './pages/sellers/BecomeSeller'

function App() {

  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<SignIn />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shops" element={<Shops />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<RequireSeller />}>
              <Route path="/new-shop" element={<NewShop />} />
            </Route>
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
