
// hooks
import { useState, useEffect } from "react"
import useMediaQuery from "../../../../hooks/useMediaQuery"

// motion
import { motion, AnimatePresence } from "framer-motion"

// components
import AddPlus from "../../../../assets/svg/AddPlus"
import NewProduct from "./NewProduct"
import Filters from "../../../../components/dashboard/filters/Filters"
import Stats from "../../../../components/dashboard/stats/Stats"
import Oops from "../../../../components/errorComponent/Oops"
import ProductTable from "../../../../components/dashboard/table/ProductTable"

// services
import { fetchDashboardProductsData } from "../../../../services/fetchDashboardData";

// types
import type { DashboardProductsDataStats, DashboardProductsData } from "../../../../types/dashboardDataType";

// Dashboard data
import { emptyProductsDataStats, defaultTableColumns , mobileTableColumns} from "../../../../types/dashboardDataType";

function Products() {

  const [productsDataStats, setProductsDataStats] = useState<DashboardProductsDataStats>(emptyProductsDataStats);
  const isMobile = useMediaQuery(768);
  const tableColumns = isMobile? mobileTableColumns : defaultTableColumns;
  
  const [errorObj, setErrorObj] = useState<{ errorState: boolean, errorMsg: string }>({
    errorState: false,
    errorMsg: ""
  });

  const [productsData, setProductsData] = useState<DashboardProductsData[]>([]);
  
  const [ShowNewProductForm, setShowNewProductForm] = useState<boolean>(false);
  const productFormVariants = {
    open: {
      width: `${69+8+16}px`,
      backgroundColor: "red"
    },
    closed: {
      width: `${122+8+16}px`,
      backgroundColor: "var(--primary-color)"
    }
  }

  const ToggleNewProductForm = () => {
    setShowNewProductForm(!ShowNewProductForm);
  }

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

  useEffect(() => {
    fetchProductsData();
  }, []);

  if (errorObj.errorState) return <Oops message={errorObj.errorMsg} retry={fetchProductsData} />

  else return (
    <>
      <div className="dashboard__header">
        <h4>Products</h4>
        <motion.button 
          className="pill__btn button--secondary" 
          id="panel-button" 
          variants={productFormVariants}
          animate={ShowNewProductForm ? "open" : "closed"}
          transition={{ duration: 0.4 }}
          style={{display:"flex", gap: "0.2rem", alignItems: "center", padding: "0.5rem", paddingRight: "1rem", marginRight: "0px", marginTop: "-1rem", marginBottom: "-1rem" , scale:0.85, y:8, x:20}} 
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
      <ProductTable productsData={productsData} tableColumns={tableColumns} />
    </>
  )
}

export default Products