// components
import List from "../../../components/sidebar/List";

// React Router
import { Link } from "react-router-dom"
import { useState } from "react";

// motion
import { motion , type  Variants } from "framer-motion"

// hooks
import useMediaQuery from "../../../hooks/useMediaQuery";

// svg
import OverviewSvg from "../../../assets/svg/overview"
import ProductsSvg from "../../../assets/svg/products"
import ShopSvg from "../../../assets/svg/shops"
import OrdersSvg from "../../../assets/svg/orders"
import CustomersSvg from "../../../assets/svg/customers"
import SettingsSvg from "../../../assets/svg/settings"
import LogoutSvg from "../../../assets/svg/logoout"

// types
import type { DashboardPagesInterface } from "../dashboard";



export default function Sidebar({active, handleActive}: {active:(keyof DashboardPagesInterface), handleActive: (e: React.MouseEvent<HTMLLIElement>) => void}) {
    
    const isMobile = useMediaQuery(600);

    const sidebarVariants:  Variants = {
      open: {
        height: "fit-content",
        width: "150px",
        transition: {
          duration: 0.4,
          ease: "easeInOut"
        }
      },
      closed: {
        height: "60px",
        transition: {
          duration: 0.4,
          ease: "easeInOut"
        }
      }
    }

    const sidebarUlVariants:  Variants = {
      open: {
        height: "fit-content",
        width: "150px",
        transition: {
          duration: 0.4,
          ease: "easeInOut"
        }
      },
      closed: {
        height: "45px",
        transition: {
          duration: 0.4,
          ease: "easeInOut"
        }
      }
    }
    
    return (
        <motion.div className="sidebar no-sidebar" variants={isMobile?sidebarVariants: {}} initial={"closed"} whileHover={"open"} style={isMobile?{
        
        height: "45px", width: "2.5rem", overflow: 'hidden', backgroundColor: "transparent", borderRadius: "1rem", marginTop: "1rem", marginLeft: "0.5rem"}:{}}>
            <motion.ul style={{backgroundColor: "var(--background-color)", width: "2.5rem", padding: "0rem", paddingLeft: "0.2rem", paddingTop:"0.3rem"}}>
              <Link to="/dashboard"><List id="overview" icon={<OverviewSvg fill="var(--color)" size={20} />} label="overview" active={active} handleActive={handleActive} /></Link>
              <Link to="/dashboard/products"><List id="products" icon={<ProductsSvg fill="var(--color)" size={20} />} label="products" active={active} handleActive={handleActive} /></Link>
              <Link to="/dashboard/orders"><List id="orders" icon={<OrdersSvg fill="var(--color)" size={20} />} label="orders" active={active} handleActive={handleActive} /></Link>
              <Link to="/dashboard/shops"><List id="shops" icon={<ShopSvg fill="var(--color)" size={20} />} label="shops" active={active} handleActive={handleActive} /></Link>
              <Link to="/dashboard/customers"><List id="customers" icon={<CustomersSvg fill="var(--color)" size={20} />} label="customers" active={active} handleActive={handleActive} /></Link>
              <Link to="/dashboard/settings"><List id="settings" icon={<SettingsSvg fill="var(--color)" size={20} />} label="settings" active={active} handleActive={handleActive} /></Link>
              <List id="logout" icon={<LogoutSvg fill="var(--color)" size={20} />} label="logout" active={active} handleActive={handleActive} />
            </motion.ul>
        </motion.div>
    )
}