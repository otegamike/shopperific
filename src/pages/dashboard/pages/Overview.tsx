import { useEffect, useState } from "react";
import OverviewSvg from "../../../assets/svg/overview"

// hooks
import { useAuth } from "../../../hooks/useAuth"

// services
import { getOverviewData } from "../../../services/dashboardServices";

// utils
import { capitalize } from "../../../utils/capitalize";

// components
import StatCard from "../../../components/cards/statCard";
import LoadingComponent from "../../../components/loader/Loading";
import ShopRevenueChart from "../components/graphs/ShopRevenueChart";
import Oops from "../../../components/errorComponent/Oops";

function Overview() {

  const { user } = useAuth()
  const username = user?.firstName || "Guest";

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setIsLoading(true);
        const overviewData = await getOverviewData();
        setData(overviewData.data);
      } catch (err: any) {
        setError(err.message || "Failed to load overview data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", display: "flex", justifyContent: "center" }}>
        <LoadingComponent />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        <Oops message={error} />
      </div>
    );
  }

  const globalStats = data?.globalStats || { totalRevenue: 0, orders: 0, visits: 0 };
  const recentOrders = data?.recentOrders || [];
  const shopsData = data?.shops || [];

  return (
    <>
      <div className="dashboard__header">
        <h4><OverviewSvg fill='black' size={20} /> Overview</h4>
      </div>

      <div className="welcome__card">
        <h3> Welcome Back, <span className="user__name">{capitalize(username)}</span></h3>
        <p>Here's how your shops are doing today.</p>
      </div>

      <div className="overview__stats__container">
        <OverviewStatCard label="Total sales" value={`$${globalStats.totalRevenue}`} />
        <OverviewStatCard label="Orders" value={`${globalStats.orders}`} />
        <OverviewStatCard
          label="Avg Orders Value"
          value={`$${globalStats.orders > 0 ? (globalStats.totalRevenue / globalStats.orders).toFixed(2) : "0.00"}`}
        />
        <OverviewStatCard label="Visitors" value={`${globalStats.visits}`} />
      </div>

      {/* Charts Section */}
      <div className="charts__container">
        <StatCard cardColor="var(--light-color)" className="charts">
          <ShopRevenueChart data={shopsData} />
        </StatCard>
      </div>

      <div className="orders__container">
        <div className="subheading">
          <h4> Recent Orders</h4>
          <h4><a href="#"> View all</a></h4>
        </div>

        <StatCard cardColor="var(--light-color)" className="orders">
          {recentOrders.length > 0 ? (
            recentOrders.map((order: any, idx: number) => (
              <OrderCard key={idx} orderDetail={order} />
            ))
          ) : (
            <div style={{ padding: "1rem" }}>
              <p>No recent orders found.</p>
            </div>
          )}
        </StatCard>
      </div>
    </>
  )
}

export default Overview

interface OverviewStatCardProp {
  label: string;
  value: string;
}

function OverviewStatCard({ label, value }: OverviewStatCardProp) {
  return (
    <>
      <StatCard>
        <div className="stat__label">{label}</div>
        <div className="stat__value">{value}</div>
      </StatCard>
    </>
  )
}



interface OrderCardProp {
  orderDetail: {
    img: string;
    orderNumber: string;
    price: string;
    name: string;
  }
}

function OrderCard({ orderDetail }: OrderCardProp) {
  return (
    <>
      <div className="order">
        <div className="order__img">
          <img src={orderDetail.img} alt="" />
        </div>
        <div className="order__info">
          <h4>Order #{orderDetail.orderNumber}</h4>
          <p>{orderDetail.name} | {orderDetail.price}</p>
        </div>
      </div>
    </>
  )
}


