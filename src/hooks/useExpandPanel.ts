// react
import { useState } from "react";

// utils
import { getRelativePosition } from "../utils/calculateDimentions";

// types
import type { Position } from "../utils/calculateDimentions"; 

export interface ExpandProps {
  id: string;
  scrollTop: number;
  initialPosition: Position;
}


export const useExpandPanel = (expandFrom: string, expandTo: string) => {
    const [expandProps, setExpandProps] = useState<ExpandProps | null>(null);

    const mountId = expandTo;

    const handleExpandPanel = (e: React.MouseEvent<HTMLButtonElement>, productid: string) => {
        const container = document.getElementById(expandTo);
        const nearestActionPanel = e.currentTarget.closest<HTMLElement>(`.${expandFrom}`);

        const initialPosition = getRelativePosition(container, nearestActionPanel)

        if (container && initialPosition) {
            const scrollPosition = container.scrollTop;
            console.log(scrollPosition);

            container.style.overflow = "hidden";

            setExpandProps({ id: productid, scrollTop: scrollPosition, initialPosition });

        }
    }

    const handleCollapsePanel = () => {
        const container = document.getElementById(expandTo);

        if (container) {
            container.style.overflow = "auto";
        }
        setExpandProps(null);
    }

    return { 
        expandProps, 
        handleExpandPanel, 
        handleCollapsePanel,
        mountId
    };
}