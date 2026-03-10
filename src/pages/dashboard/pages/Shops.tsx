import { useState, useEffect } from "react";
import ShopSvg from "../../../assets/svg/shops"
import LoadingComponent from "../../../components/loader/Loading"
import Oops from "../../../components/errorComponent/Oops"
import AddPlus from "../../../assets/svg/AddPlus";
import { Link } from "react-router-dom";
import OrderFilters from "../../../components/dashboard/filters/OrderFilters";

// services
import { getShops } from "../../../services/shops";

// components
import DashboardShopCard from "../../../components/cards/dashboardShopCard/DashboardShopCard";

// types
import type { ShopDataType } from "../../../types/shopsInterface";

function Shops() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorObj, setErrorObj] = useState<{ errorState: boolean, errorMsg: string }>({ errorState: false, errorMsg: "" });
  const [shopsData, setShopsData] = useState<ShopDataType[]>([]);

  const loadShops = async () => {
    try {
      setIsLoading(true);
      const fetchShops: any = await getShops();
      if (fetchShops.errorMsg) {
        setErrorObj({ errorState: true, errorMsg: fetchShops.errorMsg });
      } else {
        setShopsData(fetchShops.shops || []);
        setErrorObj({ errorState: false, errorMsg: "" });
      }
    } catch (error: any) {
      setErrorObj({ errorState: true, errorMsg: error.message || "Failed to load shops" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  if (errorObj.errorState) return <Oops message={errorObj.errorMsg} retry={loadShops} />;

  return (
    <>
      <div className="dashboard__header" style={{ marginBottom: "1rem" }}>
        <h4><ShopSvg fill='black' size={20} /> Shops</h4>
        <Link to='/new-shop'>
          <button className="pill__btn button--secondary" style={{ display: "flex", gap: "0.2rem", alignItems: "center", padding: "0.5rem", paddingRight: "1rem", marginRight: "-0.5rem", marginTop: "-2rem", marginBottom: "-0.5rem", transform: "scale(0.85)"}} >
            <AddPlus animate="closed"/>
            New Shop
          </button>
        </Link>
      </div>

      <OrderFilters></OrderFilters>



      <div className="dashboard__shops__section" style={{ minHeight: "62vh", }}>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
            <LoadingComponent />
          </div>
        ) : shopsData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>You have not created any shops yet.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem"
          }}>
            {shopsData.map(shop => (
              <DashboardShopCard key={shop._id} shop={shop} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Shops;