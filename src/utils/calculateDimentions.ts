export interface Position {
    top: number ,
    left: number,
    width: number,
    height: number
}

export const getRelativePosition = (parent: HTMLElement | null, child: HTMLElement | null): Position | void => {
    if (!parent || !child) {
        console.warn("Target parent or child element not found in DOM.");
        return;
    }
    
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    

    const relativePosition = {
        top: Math.round(childRect.top - parentRect.top + parent.scrollTop),
        left: Math.round(childRect.left - parentRect.left + parent.scrollLeft),
        width: childRect.width,
        height: childRect.height

    };

    return relativePosition
}