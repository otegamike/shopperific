
// hooks
import { useState, useEffect } from "react"
import { useExpandPanel } from "../../../../hooks/useExpandPanel";

import useMediaQuery from "../../../../hooks/useMediaQuery"

// motion
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

// components
import ProductsSvg from "../../../../assets/svg/products"
import AddPlus from "../../../../assets/svg/AddPlus"
import ProductForm from "./ProductForm"
import Filters from "../../../../components/dashboard/filters/Filters"
import Stats from "../../../../components/dashboard/stats/Stats"
import Oops from "../../../../components/errorComponent/Oops"
import ProductTable from "../../../../components/dashboard/table/ProductTable"
import { TableActions } from "../../../../components/dashboard/table/ProductTable";
import { ExpandPanel } from "../../../../components/panels/expandPanel/ExpandPanel";
import LoadingComponent from "../../../../components/loader/Loading";
import ProductDetails from "../../../../components/product/ProductDetails";

// services
import { fetchDashboardProductsData } from "../../../../services/DashboardDataServices";

// types
import type { DashboardProductsDataStats, DashboardProductsData } from "../../../../types/dashboardDataType";
import type { ShopListType } from "../../../../types/shopsInterface";

// Dashboard data
import { emptyProductsDataStats, defaultTableColumns, mobileTableColumns } from "../../../../types/dashboardDataType";


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
  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // expand product
  const { expandProps, handleExpandPanel, handleCollapsePanel, mountId } = useExpandPanel("table__actions", "dashboard-body-container");

  // products data
  const [productsData, setProductsData] = useState<DashboardProductsData[]>([]);
  const [productsDataStats, setProductsDataStats] = useState<DashboardProductsDataStats>(emptyProductsDataStats);
  const [currentShop, setCurrentShop] = useState<string>("");
  const [shopList, setShopsList] = useState<ShopListType[]>([]);
  const [newData, setNewData] = useState<number>(0);

  const reloadProductsData = () => {
    setNewData((prev) => prev + 1);
  }

  const changeCurrentShop = (shop: string) => {
    setCurrentShop(shop);
  }

  const updateShopList = (shopList: ShopListType[]) => {
     setShopsList(shopList)
  }

  // new product form
  const [ShowNewProductForm, setShowNewProductForm] = useState<boolean>(false);
  const ToggleNewProductForm = () => {
    setShowNewProductForm(!ShowNewProductForm);
  }

  // fetch products data
  const fetchProductsData = async () => {
    setIsLoading(true);
    const DashboardProductsData = await fetchDashboardProductsData(currentShop);

    // if there's an error.
    if ("errorMsg" in DashboardProductsData) {
      setErrorObj({ errorState: true, errorMsg: DashboardProductsData.errorMsg });
      setIsLoading(false);
      return;
    }

    const { productsStats, productsData } = DashboardProductsData;

    setProductsDataStats(productsStats);
    setProductsData(productsData);
    setIsLoading(false);
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

  const handleActions: ProductActions = {
    delete: handleDeleteProduct,
    expand: handleExpandPanel,
    isExpanded: (productid: string) => expandProps?.id === productid,
    collapse: handleCollapsePanel
  }

  useEffect(() => {
    fetchProductsData();
  }, [newData, currentShop]);

  if (errorObj.errorState) return <Oops message={errorObj.errorMsg} retry={fetchProductsData} />
  else if (isLoading) return <LoadingComponent />
  else return (
    <>
      <div className="dashboard__header">
        <h4><ProductsSvg fill='black' size={20} /> Products</h4>
        <AddProductButton ShowNewProductForm={ShowNewProductForm} ToggleNewProductForm={ToggleNewProductForm} />
      </div>

      <AnimatePresence>
        {ShowNewProductForm && <ProductForm reloadProductsData={reloadProductsData} shopList={shopList} />}
      </AnimatePresence>

      <Stats productsDataStats={productsDataStats} />
      <div className="dashboard__products__section">
        <Filters currentShop={currentShop} changeCurrentShop={changeCurrentShop} updateShopList={updateShopList} shopList={shopList} />
        <LayoutGroup>
          <ProductTable productsData={productsData} tableColumns={tableColumns} handleActions={handleActions} />
          <AnimatePresence>
            {expandProps && (
              <ExpandPanel expandProps={expandProps} mountId={mountId}>
                    <TableActions
                      productId={expandProps.id}
                      type="expand"
                      handleActions={handleActions}
                      panelStyles={{opacity: 1, top: "1rem", right: "1rem", bottom: "none", zIndex: 10}}
                    />
                    <ProductDetails product={productsData.filter((product) => product._id === expandProps.id)[0]} />
              </ExpandPanel>
              )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
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



const AddProductButton = ({ShowNewProductForm, ToggleNewProductForm}: {ShowNewProductForm: boolean, ToggleNewProductForm: () => void}) => {
  return (
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
  )
}