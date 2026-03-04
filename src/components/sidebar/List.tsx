import DownArrow from "../../assets/svg/DownArrow"
import { capitalize } from "../../utils/capitalize";
import { motion, type Variants } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";



export interface listInterface {
    id: string;
    icon: React.ReactNode;
    label: string;
    active: string;
    isSidebarOpen: boolean;
    handleActive: (e: React.MouseEvent<HTMLLIElement>) => void;
}

type State = "visible" | "hidden" | "desktop";

function List({ id, icon, label, active, isSidebarOpen, handleActive }: listInterface) {


    const isMobile = useMediaQuery(600);
    const state: State = isMobile
        ? (isSidebarOpen ? "visible" : "hidden")
        : "desktop";

    const isActive = active === id;
    return (
        <motion.li variants={liVariants} animate={isActive ? "visible" : state} style={isActive&&!isMobile ? {backgroundColor: "var(--primary-color-400)", color: "var(--light-color)", "--color": "var(--light-color)"} as React.CSSProperties : {}} id={id} className={isActive ? "active" : ""} onClick={handleActive}>
            <span className="sidebar__item">
                {icon}
                <span className="label">{isActive ? (isSidebarOpen ? label : capitalize(label)) : label}</span>
                {isMobile && isActive && <DownArrow fill="var(--color)" size={13} animate={isSidebarOpen ? "open" : "closed"} />}
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
        transform: "scaleY(0.1)",
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
        transform: "scaleY(1)",
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            display: { duration: 0 },
            height: { delay: 0.1, duration: 0.4 }

        }
    },
    desktop: {
        opacity: 1,
        height: "auto",
        display: "flex",
        transform: "scaleY(1)",
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            display: { duration: 0 },
            height: { delay: 0.1, duration: 0.4 }

        }
    }
}

