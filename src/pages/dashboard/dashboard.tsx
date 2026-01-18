//styles
import "./dashboard.css"

//react
import { useState } from "react"

// Components 
import Header from "../../components/header/Header"
import OverviewSvg from "../../assets/svg/overview"
import ProductsSvg from "../../assets/svg/products"
import OrdersSvg from "../../assets/svg/orders"
import CustomersSvg from "../../assets/svg/customers"
import SettingsSvg from "../../assets/svg/settings"
import LogoutSvg from "../../assets/svg/logoout"
function dashboard() {

  const [active, setActive] = useState("overview");

  const handleActive = (e: React.MouseEvent<HTMLLIElement>) => {
    setActive(e.currentTarget.id || "");
  }

  return (
    <>
      <Header navbar={true} />
      <main className="center__content">
        <div className="dashboard__page">
          <div className="sidebar">
            <ul>
              <li id="overview" className={active === "overview" ? "active" : ""} onClick={handleActive}> <OverviewSvg fill="var(--color)" size={20} />overview</li>
              <li id="products" className={active === "products" ? "active" : ""} onClick={handleActive}> <ProductsSvg fill="var(--color)" size={20} />products</li>
              <li id="orders" className={active === "orders" ? "active" : ""} onClick={handleActive}> <OrdersSvg fill="var(--color)" size={20} />orders</li>
              <li id="customers" className={active === "customers" ? "active" : ""} onClick={handleActive}> <CustomersSvg fill="var(--color)" size={20} />customers</li>
              <li id="settings" className={active === "settings" ? "active" : ""} onClick={handleActive}> <SettingsSvg fill="var(--color)" size={20} />settings</li>
              <li id="logout" className={active === "logout" ? "active" : ""} onClick={handleActive}> <LogoutSvg fill="var(--color)" size={20} />logout</li>
            </ul>
          </div>
          <div className="dashboard__body">

          </div>
        </div>

      </main>
    </>
  )
}

export default dashboard