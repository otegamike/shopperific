import type { DashboardProductsData } from "../../types/dashboardDataType";

type ProductTableProps = {
  productsData: DashboardProductsData[];
}
export default function ProductTable({productsData}: ProductTableProps) {

    console.log("productsData", productsData);
    if (productsData.length === 0) {
        return <p>No products found</p>
    }
  return (
    <>
    <div className="table__container">
        <div className="table">
            <div className="table__row table__header">
                {Object.keys(productsData[0]).map((key) => (
                <div key={`table-header-${key}`} className="table__cell table__header__cell">{key}</div>
                ))}
            </div>
            <div className="table__body">
                {productsData.map((product, index) => (
                <TableRowComponent key={`table-row-${index}`} productData={product} index={index} />
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

type ProductRowComponentProp = {
  productData: DashboardProductsData;
  index: number;
}

export const TableRowComponent = ( {productData, index}: ProductRowComponentProp ) => {
    return (
        <div className="table__row table__body">
            {Object.entries(productData).map(([key, value]) => {
                if (key === "images") {
                    return (
                        <div key={`table-row-${index}-${key}`} className="table__cell table__body__cell">
                            <img src={value[0]} alt="" />
                        </div>
                    )
                } else {
                    return (
                        <div key={`table-row-${index}-${key}`} className="table__cell table__body__cell">{value}</div>
                    )
                }
            })}
        </div>
    )
}

