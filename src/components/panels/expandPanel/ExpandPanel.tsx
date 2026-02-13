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

export const ExpandPanel = ({expandProps, children, mountId}: ExpandPanelProps) => {
  const duration = 0.4;
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