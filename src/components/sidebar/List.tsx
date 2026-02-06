import DownArrow from "../../assets/svg/DownArrow"
import { capitalize } from "../../utils/capitalize";
import { motion, type Variants } from "framer-motion";

export interface listInterface {
    id: string;
    icon: React.ReactNode;
    label: string;
    active: string;
    isSidebarOpen: boolean;
    handleActive: (e: React.MouseEvent<HTMLLIElement>) => void;
}

function List({id, icon, label, active, isSidebarOpen, handleActive}: listInterface) {
  
  const isActive = active === id;
  return (
    <motion.li variants={liVariants} animate={isActive ? "visible" : (isSidebarOpen? "visible" : "hidden")} id={id} className={isActive ? "active" : ""} onClick={handleActive}> 
        <span className="sidebar__item">
            {icon} 
            <span className="label">{isActive ? (isSidebarOpen? label : capitalize(label)) : label}</span>
            {isActive && <DownArrow fill="var(--color)" size={13} animate={isSidebarOpen ? "open" : "closed"}/>}
        </span>
    </motion.li>
  )
}

export default List

const liVariants: Variants = {
    hidden: {
        opacity: 0,
        height: 0.001,
        display: "none",
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            display: { delay: 0.4, duration: 0 },
            opacity: { duration: 0.3 }
        }
    },
    visible: {
        opacity: 1,
        height: "auto",
        display: "flex",
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            display: { duration: 0 },
            height: { delay: 0.1, duration: 0.4 }

        }
    }
}