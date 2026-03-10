
import { useState, useEffect } from "react";
import OrdersSvg from "../../../assets/svg/orders"
import LoadingComponent from "../../../components/loader/Loading"
import Oops from "../../../components/errorComponent/Oops"

// services
import { getDashboardOrders } from "../../../services/dashboardServices";

// components
import OrdersTable from "../../../components/dashboard/table/OrdersTable";
import { ShopSelect } from "../../../components/dashboard/filters/Filters";
import OrderStats from "../../../components/dashboard/stats/OrderStats";
import { MultiSelect } from "../../../components/dashboard/filters/MultiSelect";
import OrderFilters from "../../../components/dashboard/filters/OrderFilters";

// types
import type { Pagination } from "../../../types/paginationInterface";
import type { ShopListType } from "../../../types/shopsInterface";
import type { OrderDataInterface } from "../../../types/OrderInterface";


const statusList = [
  {name: "Pending", value: "pending"},
  {name: "Shipped", value: "shipped"},
  {name: "Cancelled", value: "cancelled"}
]

function Orders() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorObj, setErrorObj] = useState<{ errorState: boolean, errorMsg: string }>({ errorState: false, errorMsg: "" });

  const [status, setStatus] = useState<string>("");
  const [orderedProducts, setOrderedProducts] = useState<OrderDataInterface[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    currentPage: 1,
    limit: 12
  });
  const [currentShop, setCurrentShop] = useState<string>("");
  const [shopList, setShopsList] = useState<ShopListType[]>([]);

  // KPI Stats
  const [stats, setStats] = useState({ pending: 0, shipped: 0, delivered: 0, cancelled: 0 });

  const [page, setPage] = useState<number>(1);

  const totalPages = Math.ceil(pagination.totalItems / pagination.limit) || 1;

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getDashboardOrders(currentShop, status, pagination.currentPage, pagination.limit);

      // If the backend returned undefined because of the fast-return data structuring bug, default to empty
      setOrderedProducts(data?.orders || []);
      setPagination(data?.pagination || { totalItems: 0, currentPage: 1, limit: 12 });
      setShopsList(data?.shopList || []);

      if (data?.orderStats) {
        setStats(data.orderStats);
      } else {
        setStats({ pending: 0, shipped: 0, delivered: 0, cancelled: 0 });
      }

      setErrorObj({ errorState: false, errorMsg: "" });
    } catch (error: any) {
      setErrorObj({ errorState: true, errorMsg: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  function changeCurrentShop(shop: string) {
    setCurrentShop(shop);
    setPage(1);
  }

  function changeSelectedStatus(value: string) {
    setStatus(value)
  }

  useEffect(() => {
    loadOrders();
  }, [currentShop, page, status]);

  if (errorObj.errorState) return <Oops message={errorObj.errorMsg} retry={loadOrders} />;

  return (
    <>
      <div className="dashboard__header" style={{ marginBottom: "1rem", padding: "0.5rem", paddingTop: "0" }}>
        <h4><OrdersSvg fill='black' size={20} /> Orders</h4>
        <ShopSelect
          shopList={shopList}
          currentShop={currentShop}
          changeCurrentShop={changeCurrentShop}
          style={{ maxWidth: "10rem", margin: "none" }}
        />
      </div>

      <OrderStats stats={stats} />

      <OrderFilters>
        <MultiSelect list={statusList} selected={status} changeSelection={changeSelectedStatus} all="status" />
      </OrderFilters>

      <div className="dashboard__orders__section" style={{ minHeight: "62vh" }}>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
            <LoadingComponent />
          </div>
        ) : (
          <>
            
            <OrdersTable ordersData={orderedProducts} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="pill__btn button--secondary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                >
                  Previous
                </button>
                <span style={{ alignSelf: "center", fontSize: "0.9rem", fontWeight: "600" }}>Page {page} of {totalPages}</span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="pill__btn button--secondary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Orders;