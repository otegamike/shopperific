import SearchSvg from "../../../assets/svg/search"
import "../../header/header.css"
import "./search.css"
import { useState, useEffect } from "react"
import { calculateSearchWidth } from "../../../utils/SearchWidth"

function Search() {
    const [searchWidth, setSearchWidth] = useState<string>("60vw");
    const [windowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const width = calculateSearchWidth();
        if (!width) return;
        setSearchWidth(width);

    }, [windowWidth]);

    return (
        <div className="search">
            <div className="search-bounds">
                <input type="text" style={{ "--search-width": searchWidth } as React.CSSProperties} id="search" name="search" placeholder="Search" />
                <SearchSvg size={25} fill="var(--panel-color-dark)" style={{ opacity: 0.5 }} className="search-icon" />
            </div>
        </div>
    )
}

export default Search