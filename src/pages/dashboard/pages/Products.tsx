
// components
import Button from "../../../components/buttons/button"
import Search from "../../../components/contents/search/Search"

function Products() {
  return (
    <>
        <div className="dashboard__header">
            <h4>Products</h4>
            <Button type="secondary" className="pill__btn" id="panel-button" style={{marginRight: "0px", marginTop: "-1rem", marginBottom: "-1rem"}} content="Add Product" />
        </div>

        <div className="filter__container"><div className="filters">
            <Search /> 
            <div className="filter__btns">
                <Button type="tetirary" id="category" className="pill__btn"  content="category" />
                <Button type="tetirary" id="category" className="pill__btn"  content="status" />
                <Button type="tetirary" id="category" className="pill__btn"  content="sort" />
            </div>
        </div></div>

        <div className="stats__container"><div className="stats">
          <div className="stat__card">
            <h5>Total Products</h5>
            <p>100</p>  
          </div>
          <div className="stat__card">
            <h5>in stock</h5>
            <p>100</p>
          </div>
          <div className="stat__card">
            <h5>out of stock</h5>
            <p>100</p>
          </div>

          <div className="stat__card">
            <h5>Active Products</h5>
            <p>100</p>
          </div>
            
        </div></div>
    </>
  )
}

export default Products