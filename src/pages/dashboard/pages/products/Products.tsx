
// hooks
import { useState } from "react"

// components
import Button from "../../../../components/buttons/button"
import Search from "../../../../components/contents/search/Search"
import NewProduct from "./NewProduct"

function Products() {

  const [ShowNewProductForm, setShowNewProductForm] = useState<boolean>(false);

  const ToggleNewProductForm = () => {
    setShowNewProductForm(!ShowNewProductForm);
  }

  return (
    <>
      <div className="dashboard__header">
        <h4>Products</h4>
        <Button type="secondary" className="pill__btn" id="panel-button" style={{ marginRight: "0px", marginTop: "-1rem", marginBottom: "-1rem" }} content="Add Product" onClick={ToggleNewProductForm}/>
      </div>

      {ShowNewProductForm && <NewProduct />}

      <div className="filter__container"><div className="filters">
        <Search />
        <div className="filter__btns">
          <Button type="tetirary" id="category" className="pill__btn" content="category" />
          <Button type="tetirary" id="category" className="pill__btn" content="status" />
          <Button type="tetirary" id="category" className="pill__btn" content="sort" />
        </div>
      </div></div>

      <div className="stats__container"><div className="stats no-scrollbar">
        <div className="stat__card">
          <h5>Total Products</h5>
          <p>730</p>
        </div>
        <div className="stat__card green">
          <h5>in stock</h5>
          <p>1670</p>
        </div>
        <div className="stat__card red">
          <h5>out of stock</h5>
          <p>19</p>
        </div>

        <div className="stat__card purple">
          <h5>Active Products</h5>
          <p>35</p>
        </div>

      </div></div>
    </>
  )
}

export default Products