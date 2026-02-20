// react 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// css
import "./table.css";

// types
import type { DashboardProductsData } from "../../../types/dashboardDataType";

// svgs
import EditSvg from "../../../assets/svg/editSvg";
import ExpandSvg from "../../../assets/svg/ExpandSvg";
import DeleteSvg from "../../../assets/svg/DeleteSvg";
import LoaderSvg from "../../../assets/svg/loader";
import CollapseSvg from "../../../assets/svg/Collapse";


// services
import { deleteProduct } from "../../../services/DashboardDataServices";

// utils
import { alertObj } from "../../../utils/alerts/alert";

// types
import type { ProductActions } from "../../../pages/dashboard/pages/products/Products";

type ProductTableProps = {
    productsData: DashboardProductsData[];
    tableColumns: (keyof DashboardProductsData)[];
    handleActions: ProductActions;
}
export default function ProductTable({ productsData, tableColumns, handleActions }: ProductTableProps) {

    const templateColumn = tableColumns.map((key) => {
        if (key === "description") return "3fr";
        if (key === "name") return "1.8fr";
        if (key === "price") return "0.7fr";
        if (key === "stock") return "0.7fr";
        if (key === "images") return "1fr";
        return "1fr";
    }).join(" ");
    if (productsData.length === 0) {
        return <p>No products found</p>
    }
    return (
        <>
            <div className="table__container" style={{ "--column-count": tableColumns.length || 6, "--template-column": templateColumn || "1fr 1fr 2fr 1fr 1fr 1fr" } as React.CSSProperties}>
                <div className="table">
                    <div className="table__row table__header">
                        {tableColumns.map((key) => (
                            <div key={`table-header-${key}`} className="table__cell table__header__cell" style={{ textTransform: "capitalize", fontWeight: "600", justifyContent: key === "stock" || key === "price" ? "flex-start" : "center" }}>{key}</div>
                        ))}
                    </div>
                    <div className="table__body">
                        <AnimatePresence>
                            {productsData.map((product) => (
                                <TableRowComponent key={`table-row-${product._id}`} tableColumn={tableColumns} productData={product} handleActions={handleActions} />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    )
}

type ProductRowComponentProp = {
    tableColumn: (keyof DashboardProductsData)[];
    productData: DashboardProductsData;
    handleActions: ProductActions;
}

export const TableRowComponent = ({ tableColumn, productData, handleActions }: ProductRowComponentProp) => {
    return (
        <motion.div initial={{ opacity: 0, x: -50, height: "auto" }} animate={{ opacity: 1, x: 0, height: "auto" }} exit={{ opacity: 0, x: -20, height: 0 }} transition={{ duration: 0.5 }}
            className="table__row table__body" data-id={productData._id}>
            {tableColumn.map((key) => {
                if (key === "images") {
                    return (
                        <div key={`table-row-${productData._id}-${key}`} className="table__cell table__body__cell">
                            <img src={productData[key][0]} alt="" />
                        </div>
                    )
                } else {
                    return (
                        <div key={`table-row-${productData._id}-${key}`} className="table__cell table__body__cell">
                            <span className="cell__content">{productData[key]}</span>
                        </div>
                    )
                }
            })}

            <TableActions productId={productData._id} handleActions={handleActions} />

        </motion.div>
    )
}

type TableActionsProps = {
    productId: string;
    handleActions: ProductActions;
    buttonStyles?: {size: string, strokeWidth: number, color: string};
    panelStyles?: React.CSSProperties;
    type?: "list" | "expand";
}

export const TableActions = ({ productId, handleActions, panelStyles, buttonStyles}: TableActionsProps) => {
    
    const buttonColor = buttonStyles?.color || "var(--primary-color-500)";
    const size = buttonStyles?.size || "1.1rem";
    const strokeWidth = buttonStyles?.strokeWidth || 2.3;

    const [isDeleting, setIsDeleting] = useState(false);

    // Check if panel is expanded
    const isExpanded = handleActions.isExpanded(productId);

    const handleDeleteProduct = async () => {
        if (isExpanded) {
            handleActions.collapse();
        }
        setIsDeleting(true);
        const deleteProductResponse = await deleteProduct([productId]);
        if (deleteProductResponse.deleted) {
            alertObj(deleteProductResponse.message, "success");
            handleActions.delete(productId);
        } else {
            alertObj(deleteProductResponse.errorMsg, "error");
        }
        setIsDeleting(false);
    }

    const handleExpandProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isExpanded) {
            handleActions.collapse();
        } else {
            handleActions.expand(e, productId);
        }
    }

    const handleEditProduct = () => {
        handleActions.toggleEditMode();
    }

    return (
            <div className={`table__actions table__actions__${productId}`} style={{ "--button-color": buttonColor, ...panelStyles } as React.CSSProperties}>
                    <button className="table__action__btn" onClick={handleEditProduct}><EditSvg size={size} fill={buttonColor} /></button>

                    <button className="table__action__btn" onClick={handleDeleteProduct}>
                    {isDeleting ?
                        <LoaderSvg size={size} fill={buttonColor} /> :
                        <DeleteSvg size={size} strokeWidth={strokeWidth} fill={buttonColor} />
                    }
                </button>

                <motion.button
                    className="table__action__btn"
                    onClick={handleExpandProduct}>

                    {isExpanded ?
                        <CollapseSvg size={size} strokeWidth={strokeWidth} fill={buttonColor} /> :
                        <ExpandSvg size={size} strokeWidth={strokeWidth} fill={buttonColor} />
                    }
                </motion.button>

            </div>
    )
}
