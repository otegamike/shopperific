import type { SvgProps } from "./svgInterface"
import { motion, type Variants } from "framer-motion"

const AddPlusVariants: Variants = {
  open: {
    rotate: 45,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  closed: {
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

const AddPlus =({size = 30, fill = "#f1f2f5", className, strokeWidth = 2, props, animate}: SvgProps & {animate: "open" | "closed"}) => (
  <motion.svg
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    xmlSpace="preserve"
    {...props}
    variants={AddPlusVariants}
    animate={animate}
  >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
        <path
            d="M6 12H18M12 6V18"
            stroke={fill}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        </g>
  </motion.svg>
);
export default AddPlus;