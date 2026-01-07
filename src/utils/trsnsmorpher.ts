interface Trsnsmorphervariables {
    anchorClass: string;
    from: HTMLElement;
    to: HTMLElement;
    properties?: any;
    duration?: string; 
}

export const trsnsmorpher = ({ anchorClass, from, to}: Trsnsmorphervariables) => {
    const anchor = document.querySelector(`.${anchorClass}`);
    const fromElement = from;
    const toElement = to.style.width;



    if (!anchor || !fromElement || !toElement) {
        console.error('Elements not found');
        return;
    }
    

    
}