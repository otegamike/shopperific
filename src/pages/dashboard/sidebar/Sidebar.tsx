// components
import List from "../../../components/sidebar/List";

// React Router
import { Link } from "react-router-dom"

// motion
import { motion, type Variants } from "framer-motion"

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

interface SidebarProps {
  active: keyof DashboardPagesInterface;
  isSidebarOpen: boolean;
  handleSidebarOpen: (state?: boolean) => void;
  handleActive: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export default function Sidebar({ active, isSidebarOpen, handleSidebarOpen, handleActive }: SidebarProps) {

  const isMobile = useMediaQuery(600);

  return (
    <motion.div className="sidebar no-sidebar"
      style={isMobile ? sidebarStyle : {}}>

      <motion.ul
        variants={isMobile ? sidebarUlVariants : {}}
        animate={isMobile ? isSidebarOpen ? "open" : "closed" : ""}
        style={isMobile ? ulStyles : {}}
        onClick={() => handleSidebarOpen(true)}>
        {/* down arrow */}

        <Link to="/dashboard"><List id="overview" icon={<OverviewSvg fill="var(--color)" size={20} />} label="overview" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/products"><List id="products" icon={<ProductsSvg fill="var(--color)" size={20} />} label="products"  active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/orders"><List id="orders" icon={<OrdersSvg fill="var(--color)" size={20} />} label="orders" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/shops"><List id="shops" icon={<ShopSvg fill="var(--color)" size={20} />} label="shops" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/customers"><List id="customers" icon={<CustomersSvg fill="var(--color)" size={20} />} label="customers" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/settings"><List id="settings" icon={<SettingsSvg fill="var(--color)" size={20} />} label="settings" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <List id="logout" icon={<LogoutSvg fill="var(--color)" size={20} />} label="logout" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} />
      </motion.ul>
    </motion.div>
  )
}


const sidebarStyle: React.CSSProperties = {
  position: "absolute",
  height: "auto",
  backgroundColor: "transparent",
  borderRadius: "1rem",
  marginTop: "1rem",
  marginLeft: "0.5rem"
}

const ulStyles: React.CSSProperties = {
  backgroundColor: "var(--background-color)",
  width: "150px",
  height: "40px",
  overflow: " hidden",
  padding: "0rem",
  paddingLeft: "0",
  paddingTop: "0rem",
  borderRadius: "1rem",

}

const sidebarUlVariants: Variants = {
  open: {
    // "--display": "flex",
    "--active-background-color": "var(--primary-color-400)",
    "--active-color": "var(--light-color)",
    backgroundColor: "var(--background-grey)",
    backdropFilter: "blur(10px)",
    border: "1px solid var(--background-grey)",
    height: "auto",
    padding: "1rem",
    width: "calc(150px + (2*var(--rem)))",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      // Custom property overrides for smooth color transitions
      // "--display": { duration: 0 },
      "--active-background-color": { duration: 0 },
      "--active-color": { duration: 0 },
    },
  },
  closed: {
    // "--display": "none",
    "--active-background-color": "transparent",
    "--active-color": "var(--panel-color-darkest)",
    backgroundColor: "var(--background-color)",
    height: "40px",
    padding: "0rem",
    width: "150px",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      // Delay display none so content doesn't vanish mid-animation
      // "--display": { delay: 0.4, duration: 0 },
      "--active-background-color": { duration: 0 },
      "--active-color": { duration: 0 },
    },
  },
};

