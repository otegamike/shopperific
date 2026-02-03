
// hooks
import { useState, useEffect } from "react"

// components
import Button from "../../../../components/buttons/button"
import NewProduct from "./NewProduct"
import Filters from "../../../../components/dashboard/Filters"
import Stats from "../../../../components/dashboard/Stats"
import Oops from "../../../../components/errorComponent/Oops"
import ProductTable from "../../../../components/dashboard/ProductTable"

// services
import { fetchDashboardProductsData } from "../../../../services/fetchDashboardData";

// types
import type { DashboardProductsDataStats, DashboardProductsData } from "../../../../types/dashboardDataType"; 

function Products() {

  const [productsDataStats, setProductsDataStats] = useState<DashboardProductsDataStats>({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    totalInventory: 0
  });

  const [errorObj, setErrorObj] = useState<{errorState: boolean, errorMsg: string}>({
    errorState: false,
    errorMsg: ""
  });

  const [productsData, setProductsData] = useState<DashboardProductsData[]>([]);
  const [ShowNewProductForm, setShowNewProductForm] = useState<boolean>(false);

  const ToggleNewProductForm = () => {
    setShowNewProductForm(!ShowNewProductForm);
  }

  const fetchProductsData = async () => {
    
    const DashboardProductsData = await fetchDashboardProductsData();
    
    // if there's an error.
    if ("errorMsg" in DashboardProductsData ) {
      setErrorObj({errorState: true, errorMsg: DashboardProductsData.errorMsg});
      return;
    }

    const {productsStats, productsData} = DashboardProductsData;

    setProductsDataStats(productsStats);
    setProductsData(productsData);
  
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  if (errorObj.errorState) return <Oops message={errorObj.errorMsg} />
  
  else return (
    <>
      <div className="dashboard__header">
        <h4>Products</h4>
        <Button type="secondary" className="pill__btn" id="panel-button" style={{ marginRight: "0px", marginTop: "-1rem", marginBottom: "-1rem" }} content="Add Product" onClick={ToggleNewProductForm}/>
      </div>

      {ShowNewProductForm && <NewProduct />}

      <Stats productsDataStats={productsDataStats} />
      <Filters />
      <ProductTable productsData={productsData} />

{/* 
      <div className="table__container">
        <div className="table">
          <div className="table__row table__header">
            <div className="table__cell table__header__cell">Product</div>
            <div className="table__cell table__header__cell">Image</div>
            <div className="table__cell table__header__cell">Price</div>
            <div className="table__cell table__header__cell">Stock</div>
            <div className="table__cell table__header__cell">Category</div>
            <div className="table__cell table__header__cell">Actions</div>
          </div>
          <div className="table__body">
            <div className="table__row table__body">
              <div className="table__cell table__body__cell">Product</div>
              <div className="table__cell table__body__cell">Image</div>
              <div className="table__cell table__body__cell">Price</div>
              <div className="table__cell table__body__cell">Stock</div>
              <div className="table__cell table__body__cell">Category</div>
              <div className="table__cell table__body__cell">Actions</div>
            </div>
            <div className="table__row table__body">
              <div className="table__cell table__body__cell">Product</div>
              <div className="table__cell table__body__cell">Image</div>
              <div className="table__cell table__body__cell">Price</div>
              <div className="table__cell table__body__cell">Stock</div>
              <div className="table__cell table__body__cell">Category</div>
              <div className="table__cell table__body__cell">Actions</div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Products