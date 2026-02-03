import type { DashboardProductsDataStats } from "../../types/dashboardDataType";


type StatsProps = {
  productsDataStats: DashboardProductsDataStats;
}
function Stats({productsDataStats}: StatsProps) {
  return (
    <>
    <div className="stats__container"><div className="stats no-scrollbar">
        <div className="stat__card">
          <h5>Total Products</h5>
          <p>{productsDataStats.totalProducts}</p>
        </div>
        <div className="stat__card green">
          <h5>In Stock</h5>
          <p>{productsDataStats.inStock}</p>
        </div>
        <div className="stat__card red">
          <h5>Sold Out</h5>
          <p>{productsDataStats.outOfStock}</p>
        </div>

        <div className="stat__card purple">
          <h5>Total Inventory</h5>
          <p>{productsDataStats.totalInventory}</p>
        </div>

      </div></div>
    </>
  )
}

export default Stats