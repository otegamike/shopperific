export interface Position {
    top: number ,
    left: number,
    width: number,
    height: number
}

export const getRelativePosition = (parent: HTMLElement | null, child: HTMLElement | null): Position | void => {
    if (!child) {
        console.warn("Target child element not found in DOM.");
        return;
    }

    if (!parent) {
        console.warn("Target parent element not found in DOM.");
        return;
    }
    
    // const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    

    const relativePosition = {
        top: Math.round(childRect.top) + 16,
        left: Math.round(childRect.left) - 16,
        width: childRect.width,
        height: childRect.height

    };

    return relativePosition
}