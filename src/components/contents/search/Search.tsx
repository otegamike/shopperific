import SearchSvg from "../../../assets/svg/search"
import "../../header/header.css"
import "./search.css"
import { useState, useEffect } from "react"
import { calculateSearchWidth } from "../../../utils/SearchWidth"

interface searchBounds {
    minWidth?: string;
    maxWidth?: string;
}
interface searchProp {
    searchBounds?: searchBounds;
    dynamic?: boolean;
}

function Search({ searchBounds, dynamic = false }:searchProp) {
    const [searchWidth, setSearchWidth] = useState<string>("60vw");
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Calculate initial width
        const width = calculateSearchWidth();
        if (width) {
            setSearchWidth(width);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const width = calculateSearchWidth();
        if (width) {
            setSearchWidth(width);
        }
    }, [windowWidth]);

    return (
        <div className="search-bounds" style={ searchBounds ?  searchBounds : {} } >
            <div className="search__container">
                <input type="text" style={dynamic ? { "--search-width": searchWidth } as React.CSSProperties : {}} id="search" name="search" placeholder="Search" />
                <SearchSvg size={23} fill="var(--panel-color-dark)" style={{ opacity: 0.5 }} className="search-icon" />
            </div>
        </div>
    )
}

export default Search