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
  const sidebarStates = isMobile ? (isSidebarOpen ? "open" : "closed") : "desktop";

  return (
    <motion.div className="sidebar no-sidebar"
      variants={sidebarContainerVariants}
      animate={sidebarStates==="desktop"? "desktop": "mobile"}
      style={isMobile ? sidebarStyle : {}}>

      <motion.ul
        variants={ sidebarUlVariants }
        animate={sidebarStates}
        style={isMobile ? ulStyles : {}}
        onClick={() => handleSidebarOpen(true)}>
        {/* down arrow */}

        <Link to="/dashboard"><List id="overview" icon={<OverviewSvg fill="var(--color)" size={20} />} label="overview" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/products"><List id="products" icon={<ProductsSvg fill="var(--color)" size={20} />} label="products"  active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/orders"><List id="orders" icon={<OrdersSvg fill="var(--color)" size={20} />} label="orders" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
        <Link to="/dashboard/shops"><List id="shops" icon={<ShopSvg fill="var(--color)" size={20} />} label="shops" active={active} handleActive={handleActive} isSidebarOpen={isSidebarOpen} /></Link>
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
  marginTop: "0",
  marginLeft: "0.5rem",
  zIndex: 8,
  top: "1rem",
  left: "0.5rem"
}

const ulStyles: React.CSSProperties = {
  backgroundColor: "var(--background-color)",
  width: "150px",
  height: "40px",
  padding: "0rem",
  overflow: "hidden",
  borderRadius: "1rem",

}

const sidebarContainerVariants: Variants = {
  desktop: {
    position: "relative"
  },
  mobile: {
    position: "absolute",

  }
}

const sidebarUlVariants: Variants = {
  open: {
    "--active-background-color": "var(--primary-color-400)",
    "--active-color": "var(--light-color)",
    backgroundColor: "var(--background-grey)",
    backdropFilter: "blur(10px)",
    border: "1px solid var(--background-color-lighter)",
    height: "19.5625rem",
    padding: "1rem",
    width: "calc(150px + (2*var(--rem)))",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      
      "--active-background-color": { duration: 0 },
      "--active-color": { duration: 0 },
    },
  },

  closed: {
    "--active-background-color": "transparent",
    "--active-color": "var(--panel-color-darkest)",
    backgroundColor: "var(--background-grey)",
    backdropFilter: "blur(10px)",
    border: "1px solid var(--background-color-lighter)",
    height: "2.5rem",
    padding: "0rem",
    width: "9.375rem",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      "--active-background-color": { duration: 0 },
      "--active-color": { duration: 0 },
    },
  },

  desktop: {
    "--active-background-color": "var(--primary-color-400)",
    "--active-color": "var(--light-color)",
    opacity: 1,
    height: "100%",
    width: "auto",
    backgroundColor: "transparent",
    borderRadius: "1rem",
    display: "flex",
    padding: "1.5rem 1rem",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      height: { delay: 0.1, duration: 0.4 }

    }
  }
};

