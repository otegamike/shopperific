
// hooks
import { useState, useEffect } from "react"
import { createPortal } from "react-dom";

import useMediaQuery from "../../../../hooks/useMediaQuery"

// motion
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

// components
import ProductsSvg from "../../../../assets/svg/products"
import AddPlus from "../../../../assets/svg/AddPlus"
import NewProduct from "./NewProduct"
import Filters from "../../../../components/dashboard/filters/Filters"
import Stats from "../../../../components/dashboard/stats/Stats"
import Oops from "../../../../components/errorComponent/Oops"
import ProductTable from "../../../../components/dashboard/table/ProductTable"
import { TableActions } from "../../../../components/dashboard/table/ProductTable";


// services
import { fetchDashboardProductsData } from "../../../../services/DashboardDataServices";

// types
import type { DashboardProductsDataStats, DashboardProductsData } from "../../../../types/dashboardDataType";
import type { Position } from "../../../../utils/calculateDimentions";

// Dashboard data
import { emptyProductsDataStats, defaultTableColumns, mobileTableColumns } from "../../../../types/dashboardDataType";

// util
import { getRelativePosition } from "../../../../utils/calculateDimentions";


export interface ProductActions {
  delete: (productid: string) => boolean;
  expand: (e: React.MouseEvent<HTMLButtonElement>, productid: string) => void;
  isExpanded: (productid: string) => boolean;
  collapse: () => void;
}

function Products() {


  const isMobile = useMediaQuery(768);
  const tableColumns = isMobile ? mobileTableColumns : defaultTableColumns;

  const [errorObj, setErrorObj] = useState<{ errorState: boolean, errorMsg: string }>({
    errorState: false,
    errorMsg: ""
  });

  // expand product
  const [expandProps, setExpandProps] = useState<{ id: string, scrollTop: number, initialPosition: Position } | null>(null);

  // products data
  const [productsData, setProductsData] = useState<DashboardProductsData[]>([]);
  const [productsDataStats, setProductsDataStats] = useState<DashboardProductsDataStats>(emptyProductsDataStats);

  // new product form
  const [ShowNewProductForm, setShowNewProductForm] = useState<boolean>(false);
  const ToggleNewProductForm = () => {
    setShowNewProductForm(!ShowNewProductForm);
  }

  // fetch products data
  const fetchProductsData = async () => {

    const DashboardProductsData = await fetchDashboardProductsData();

    // if there's an error.
    if ("errorMsg" in DashboardProductsData) {
      setErrorObj({ errorState: true, errorMsg: DashboardProductsData.errorMsg });
      return;
    }

    const { productsStats, productsData } = DashboardProductsData;

    setProductsDataStats(productsStats);
    setProductsData(productsData);
  }

  // const handleEditProduct = (product: DashboardProductsData) => {

  // }

  const handleDeleteProduct = (productid: string): boolean => {
    setProductsData(prevProductsData => prevProductsData.filter((product) => product._id !== productid));

    setProductsDataStats((prevStats) => ({
      ...prevStats,
      totalProducts: prevStats.totalProducts - 1,
      inStock: prevStats.inStock - 1,
      totalInventory: prevStats.totalInventory - productsData.filter((product) => product._id === productid)[0].stock
    }));

    return true
  }

  const handleExpandProduct = (e: React.MouseEvent<HTMLButtonElement>, productid: string) => {
    const container = document.getElementById("dashboard-body-container");
    const nearestActionPanel = e.currentTarget.closest<HTMLElement>(".action__panel");

    const initialPosition = getRelativePosition(container, nearestActionPanel )

    if (container && initialPosition) {
      const scroolPosition = container.scrollTop;
      console.log(scroolPosition);

      container.style.overflow = "hidden";

      setExpandProps({ id: productid, scrollTop: scroolPosition, initialPosition });

    }
  }

  const handleCollapsePanel = () => {
    const container = document.getElementById("dashboard-body-container");

    if (container) {
      container.style.overflow = "auto";
    }
    setExpandProps(null);
  }



  const handleActions: ProductActions = {
    delete: handleDeleteProduct,
    expand: handleExpandProduct,
    isExpanded: (productid: string) => expandProps?.id === productid,
    collapse: handleCollapsePanel
  }



  useEffect(() => {
    fetchProductsData();
  }, []);

  if (errorObj.errorState) return <Oops message={errorObj.errorMsg} retry={fetchProductsData} />

  else return (
    <>
      <div className="dashboard__header">
        <h4><ProductsSvg fill='black' size={20} /> Products</h4>
        <motion.button
          className="pill__btn button--secondary"
          id="panel-button"
          variants={productFormVariants}
          animate={ShowNewProductForm ? "open" : "closed"}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", gap: "0.2rem", alignItems: "center", padding: "0.5rem", paddingRight: "1rem", marginRight: "-1.5rem", marginTop: "-2rem", marginBottom: "-2rem", scale: 0.85 }}
          onClick={() => ToggleNewProductForm()}
        >
          <AddPlus animate={ShowNewProductForm ? "open" : "closed"} strokeWidth={3} />
          {ShowNewProductForm ? "close" : "Add Product"}
        </motion.button>
      </div>

      <AnimatePresence>
        {ShowNewProductForm && <NewProduct />}
      </AnimatePresence>

      <Stats productsDataStats={productsDataStats} />
      <Filters />
      <LayoutGroup>
        <ProductTable productsData={productsData} tableColumns={tableColumns} handleActions={handleActions} />
        <AnimatePresence>
          {expandProps && (
            <EditPortal>
              <motion.div
                className="expand__container"
                style={{ top: expandProps.scrollTop }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div className="expand__content" 
                initial={{ opacity: 0, top:expandProps.initialPosition?.top + "px", left: expandProps.initialPosition?.left + "px", width: expandProps.initialPosition?.width + "px", height: expandProps.initialPosition?.height + "px" }}
                animate={{ opacity: 1, top: 0, left: 0, width: "100%", height: "100%" }} 
                transition={{ duration: 0.4 }}
                >
                  <TableActions
                    productId={expandProps.id}
                    type="expand"
                    handleActions={handleActions}
                  />
                  <button className="close__button" onClick={() => handleCollapsePanel()}>close</button>
                </motion.div>
              </motion.div>
            </EditPortal>)}
        </AnimatePresence>
      </LayoutGroup>
    </>
  )
}

export default Products

const productFormVariants = {
  open: {
    width: `${69 + 8 + 16}px`,
    backgroundColor: "red"
  },
  closed: {
    width: `${122 + 8 + 16}px`,
    backgroundColor: "var(--primary-color)"
  }
}

function EditPortal({ children }: { children: React.ReactNode }) {
  const mount = document.getElementById("dashboard-body-container");
  if (!mount) return null; // Safety check
  return createPortal(children, mount);
}