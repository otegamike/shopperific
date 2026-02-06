import type { SvgProps } from "./svgInterface"
import { motion, type Variants } from "framer-motion"

const svgVariants: Variants = {
  open: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  closed: {
    opacity: 1,
    right: "1.5rem",
  top: "0.9rem",
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

const DownArrow =({size = 30, fill = "#f1f2f5", className, style, props, animate}: SvgProps & {animate: "open" | "closed"}) => (
  <motion.svg
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width={size}
    height={size}
    className={className}
    xmlSpace="preserve"
    {...props}
    variants={svgVariants}
    animate={animate}
    style={style}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z" />
  </motion.svg>
);
export default DownArrow;