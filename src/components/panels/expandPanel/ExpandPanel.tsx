// css
import "./expand-panel.css";

// react & Motion
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

// hooks
import type { ExpandProps } from "../../../hooks/useExpandPanel";


interface ExpandPanelProps {
  expandProps: ExpandProps;
  children: React.ReactNode;
  mountId: string;
}

const duration = 0.4;

export const ExpandPanel = ({expandProps, children, mountId}: ExpandPanelProps) => {
  
  const {scrollTop, initialPosition} = expandProps;
  const {top, left, width, height} = initialPosition;
  return (
    <Portal mountId={mountId}>
      <motion.div
        className="expand__container"
        style={{ top: scrollTop }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="expand__content no-scrollbar" layout
        initial={{position: "fixed", top:top + "px", left: left + "px", width: width + "px", height: height + "px" }}
        animate={{position: "relative", top: 0, left: 0, width: "100%", height: "100%", transition: { duration: duration, position: { delay: duration , duration: 0} } }} 
        exit={{position: "fixed", top:top + "px", left: left + "px", width: width + "px", height: height + "px" }}
        transition={{ duration: duration }}
        >
         {children}
        </motion.div>
      </motion.div>
    </Portal>
  )
}

export function Portal({ children , mountId}: { children: React.ReactNode, mountId: string }) {
  const mount = document.getElementById(mountId);
  if (!mount) return null; // Safety check
  return createPortal(children, mount);
}

export interface animationProps {
  isMounted: boolean;
  handleAnimationComplete: () => void;
  duration: number;
}

export interface ExpandPanelComponentProps {
  children?: React.ReactNode;
  layoutId?: string;
  style?: React.CSSProperties;
  animationProps: animationProps;
}



export function ExpandPanelComponent ({children, layoutId, style, animationProps}: ExpandPanelComponentProps) {
  
  const {handleAnimationComplete, duration} = animationProps;

  return (
    <motion.div
        className="expand__container"
      >
        <motion.div className="expand__content no-scrollbar" layoutId={layoutId} style={style} onLayoutAnimationComplete={() => handleAnimationComplete()}
        transition={{ type: "spring", stiffness: 150, damping: 20, duration: duration }}
        >
         {children}
        </motion.div>
      </motion.div>
  )
}