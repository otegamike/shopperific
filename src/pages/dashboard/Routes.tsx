import { Route } from "react-router-dom";


// pages
import DashboardLayout from "./dashboard";
import Overview from "./pages/Overview"
import Products from "./pages/products/Products"
import Orders from "./pages/Orders"
import Shops from "./pages/Shops"
import Customers from "./pages/Customers"
// import Settings from "./pages/Settings"
// import Logout from "./pages/Logout"


function DashboardRoutes() {
  return (
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<Overview />} />
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route path="customers" element={<Customers />} />
      <Route path="shops" element={<Shops />} />
    </Route>
  )
}

export default DashboardRoutes