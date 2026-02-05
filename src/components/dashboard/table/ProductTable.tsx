// css
import "./table.css";

import type { DashboardProductsData } from "../../../types/dashboardDataType";


type ProductTableProps = {
    productsData: DashboardProductsData[];
    tableColumns: (keyof DashboardProductsData)[];
}
export default function ProductTable({ productsData, tableColumns }: ProductTableProps) {

    const templateColumn = tableColumns.map((key) => {
        if (key === "description") return "3fr";
        if (key === "name") return "2fr";
        if (key === "price") return "0.6fr";
        if (key === "stock") return "0.6fr";
        if (key === "images") return "1fr";
        return "1fr";
    }).join(" ");


    if (productsData.length === 0) {
        return <p>No products found</p>
    }
    return (
        <>
            <div className="table__container" style={{ "--column-count": tableColumns.length || 6, "--template-column": templateColumn || "1fr 1fr 2fr 1fr 1fr 1fr"} as React.CSSProperties}>
                <div className="table">
                    <div className="table__row table__header">
                        {tableColumns.map((key) => (
                            <div key={`table-header-${key}`} className="table__cell table__header__cell">{key}</div>
                        ))}
                    </div>
                    <div className="table__body">
                        {productsData.map((product, index) => (
                            <TableRowComponent key={`table-row-${index}`} tableColumn={tableColumns} productData={product} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

type ProductRowComponentProp = {
    tableColumn: (keyof DashboardProductsData)[];
    productData: DashboardProductsData;
    index: number;
}

export const TableRowComponent = ({ tableColumn, productData, index }: ProductRowComponentProp) => {
    return (
        <div className="table__row table__body">
            {tableColumn.map((key) => {
                if (key === "images") {
                    return (
                        <div key={`table-row-${index}-${key}`} className="table__cell table__body__cell">
                            <img src={productData[key][0]} alt="" />
                        </div>
                    )
                } else {
                    return (
                        <div key={`table-row-${index}-${key}`} className="table__cell table__body__cell"><span className="cell__content">{productData[key]}</span></div>
                    )
                }
            }) }
        </div>
    )
}

