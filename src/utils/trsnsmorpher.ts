interface TransmorpherVariables {
    anchorClass?: string;
    from: HTMLElement;
    to: { positionType: "element", element: HTMLElement } | { positionType: "futureEelement", mutator: string, parentPresentState: HTMLElement, childTargetSelector: string };
    toTarget?: HTMLElement;
    zIndex?: string;
    properties: (keyof CSSStyleDeclaration)[]; // Array of CSS keys
    duration?: string;
}

export const transmorph = ({ from, to, properties, zIndex, duration = "0.3s" }: TransmorpherVariables) => {
    // 1. Setup & Measurements
    const fromRect = from.getBoundingClientRect();
    let toTarget;
    let parentclone = false;
    let futureParent: HTMLElement | null = null;

    if (to.positionType === "element") {
        toTarget = to.element;
    } else if (to.positionType === "futureEelement") {
        if (!to.parentPresentState || !to.childTargetSelector) return;
        futureParent = to.parentPresentState.cloneNode(true) as HTMLElement;

        if (futureParent) {
            // Apply the mutator class to see the future state
            futureParent.classList.add(to.mutator);

            // Append invisibly to DOM to get accurate measurements
            futureParent.style.visibility = 'hidden';
            futureParent.style.pointerEvents = 'none';
            futureParent.style.zIndex = '-9999';
            document.body.appendChild(futureParent);

            const targetChild = futureParent.querySelector(to.childTargetSelector);
            if (targetChild) {
                targetChild.id = "to-child-target";
                toTarget = targetChild as HTMLElement;
            }
            console.log(toTarget, futureParent, targetChild);

            // Remove the clone after getting measurements
            // futureParent.remove();
            parentclone = true;
        }
    }

    if (!toTarget) return; // Safety check

    const toRect = toTarget.getBoundingClientRect();

    const fromStyles = window.getComputedStyle(from);
    const toStyles = window.getComputedStyle(toTarget);

    const clone = from.cloneNode(true) as HTMLElement;
    clone.id = "transmorpher-clone";

    // 2. Initial State (Start at the exact 'from' position)
    Object.assign(clone.style, {
        position: 'fixed',
        zIndex: zIndex ? zIndex : '110',
        margin: '0',
        top: '0',
        left: '0',
        width: `${fromRect.width}px`,
        height: `${fromRect.height}px`,
        // Start at the 'from' coordinates
        transform: `translate(${fromRect.left}px, ${fromRect.top}px)`,
        pointerEvents: 'none',
        transition: 'none' // No transition during setup
    });

    // Apply the specific properties (like background color or border-radius)
    properties.forEach(prop => {
        (clone.style as any)[prop] = fromStyles[prop as any];
    });

    // 3. Add to DOM and hide originals
    document.body.appendChild(clone);
    from.style.visibility = 'hidden';
    toTarget.style.visibility = 'hidden';

    // 4. The "Double Frame" Trigger
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Apply transitions now
            clone.style.transition = `transform ${duration} cubic-bezier(0.4, 0, 0.2, 1), ${properties.map(p => `${String(p)} ${duration} ease`).join(', ')}`;

            // Target State: Move to 'to' coordinates
            clone.style.transform = `translate(${toRect.left}px, ${toRect.top}px)`;


            // Target State: Update properties
            properties.forEach(prop => {
                (clone.style as any)[prop] = toStyles[prop as any];
            });
        });
    });

    // 5. Cleanup
    clone.addEventListener('transitionend', (e) => {
        // Only trigger once all transitions (transform + props) finish
        if (e.propertyName === 'transform') {
            toTarget.style.visibility = 'visible';
            clone.remove();
            if (parentclone && futureParent) {
                futureParent.remove();
            }
        }
    }, { once: false });
};