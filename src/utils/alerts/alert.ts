import "./alerts.css";

export const alertObj = (alertText: string, type: "success" | "warning" | "error" ="error") => {
    const alertEl = document.getElementById("alrtCon");
    if (!alertEl) return;
    const i = alertEl.children.length + 1;
    
    let alertType: string = "";

    if (type === "success") {
        alertType = "alert-success";
    } else if (type === "warning") {
        alertType = "alert-warning";
    } else if (type === "error") {
        alertType = "";
    }

    const alrt = `<div class="alrt ${alertType}" id="alrt${i}">${alertText}</div>`;
    
    alertEl.insertAdjacentHTML("beforeend", alrt);

    animateblock(`alrt${i}`,"fade-in","add",10);

    animateblock(`alrt${i}`, "fade-in", "remove", 4000, "delete");

}


const animateblock = (targetId: string, animator: string, type: "remove" | "add" = "remove", delay: number = 500, callback: "delete" | any = null) => {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    // 1. Define what happens when animation ends
    const onAnimationComplete = () => {
        // Clean up the listener so it doesn't fire again
        targetEl.removeEventListener('animationend', onAnimationComplete);
        targetEl.removeEventListener('transitionend', onAnimationComplete);

        // Check if user wants to delete or run a custom function
        if (callback === "delete") {
            targetEl.remove(); // Removes element from DOM
           
        } else if (typeof callback === "function") {
            callback(); // Runs custom function
        }
    };

    const performAction = () => {
        // 2. Add listeners for both CSS Animation AND Transitions
        // We add these BEFORE changing the class to catch the event
        if (callback) {
            targetEl.addEventListener('animationend', onAnimationComplete, { once: true });
            targetEl.addEventListener('transitionend', onAnimationComplete, { once: true });
        }

        // 3. Toggle the class
        if (type === "add") {
            targetEl.classList.add(animator);
         
        } else if (type === "remove") {
            targetEl.classList.remove(animator);
        }
    };

    // 4. Wait for the initial delay, then start
    setTimeout(performAction, delay);
}