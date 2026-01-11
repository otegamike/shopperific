export const calculateSearchWidth = () : string | undefined => {
    const logo = document.getElementById("logo");
        const search = document.getElementById("search");
        if (!logo || !search) return;
        const logoRect = logo.getBoundingClientRect();
        const logoDim = {width: logoRect.width, x: logoRect.x};
        const searchRect = search.getBoundingClientRect();
        const searchDim = {width: searchRect.width, x: searchRect.x};

        const searchWidth = searchDim.x - logoDim.x ;
        console.log(logoDim, searchDim, searchWidth);
        return `calc(${searchWidth}px + (0.25 * var(--rem)))`;
}