//styles
import "./dashboard.css"

//react
import { useState } from "react"

// Components 
import Header from "../../components/header/Header"
import List from "../../components/sidebar/List"

// pages
import Overview from "./pages/Overview"
import Products from "./pages/products/Products"
import Orders from "./pages/Orders"
import Shops from "./pages/Shops"
import Customers from "./pages/Customers"
// import Settings from "./pages/Settings"
// import Logout from "./pages/Logout"

// svg
import OverviewSvg from "../../assets/svg/overview"
import ProductsSvg from "../../assets/svg/products"
import ShopSvg from "../../assets/svg/shops"
import OrdersSvg from "../../assets/svg/orders"
import CustomersSvg from "../../assets/svg/customers"
import SettingsSvg from "../../assets/svg/settings"
import LogoutSvg from "../../assets/svg/logoout"

export interface DashboardPagesInterface {
  overview: React.ReactNode;
  products: React.ReactNode;
  orders: React.ReactNode;
  shops: React.ReactNode;
  customers: React.ReactNode;
}

function dashboard() {

  const [active, setActive] = useState<keyof DashboardPagesInterface>("overview");
  const pages: DashboardPagesInterface = {
    overview: <Overview />,
    products: <Products />,
    orders: <Orders />,
    customers: <Customers />,
    shops: < Shops />
  }

  const handleActive = (e: React.MouseEvent<HTMLLIElement>) => {
    setActive(
      e.currentTarget.id as keyof DashboardPagesInterface
    );
  }

  return (
    <>
      <Header navbar={true} />
      <main className="center__content dashboard__container">
        <div className="dashboard__page">
          <div className="sidebar no-sidebar">
            <ul>
              <List id="overview" icon={<OverviewSvg fill="var(--color)" size={20} />} label="overview" active={active} handleActive={handleActive} />
              <List id="products" icon={<ProductsSvg fill="var(--color)" size={20} />} label="products" active={active} handleActive={handleActive} />
              <List id="orders" icon={<OrdersSvg fill="var(--color)" size={20} />} label="orders" active={active} handleActive={handleActive} />
              <List id="shops" icon={<ShopSvg fill="var(--color)" size={20} />} label="shops" active={active} handleActive={handleActive} />
              <List id="customers" icon={<CustomersSvg fill="var(--color)" size={20} />} label="customers" active={active} handleActive={handleActive} />
              <List id="settings" icon={<SettingsSvg fill="var(--color)" size={20} />} label="settings" active={active} handleActive={handleActive} />
              <List id="logout" icon={<LogoutSvg fill="var(--color)" size={20} />} label="logout" active={active} handleActive={handleActive} />
            </ul>
          </div>
          <div className="dashboard__body">
            {pages[active] || <Overview />}
          </div>
        </div>

      </main>
    </>
  )
}

export default dashboard