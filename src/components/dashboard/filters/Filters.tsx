import Button from "../../buttons/button"
import Search from "../../contents/search/Search"


function Filters() {
  return (
    <>
    <div className="filter__container"><div className="filters">
        <Search />
        <div className="filter__btns">
          <Button type="tetirary" id="category" className="pill__btn" content="category" />
          <Button type="tetirary" id="category" className="pill__btn" content="status" />
          <Button type="tetirary" id="category" className="pill__btn" content="sort" />
        </div>
      </div></div>
    </>
  )
}

export default Filters