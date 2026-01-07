import SearchSvg from "../../../assets/svg/search"
import "./search.css"

function Search() {
    return (
        <div className="search">
            <input type="text" placeholder="Search" />
            <SearchSvg className="search-icon" />
        </div>
    )
}

export default Search