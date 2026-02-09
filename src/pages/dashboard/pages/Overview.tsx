import OverviewSvg from "../../../assets/svg/overview"

// hooks
import { useAuth } from "../../../hooks/useAuth"

// utils
import { capitalize } from "../../../utils/capitalize";

// components
import StatCard from "../../../components/cards/statCard";

function Overview() {

  const { user } = useAuth()
  const username = user?.firstName || "Guest";

  return (
    <>
        <div className="dashboard__header">
        <h4><OverviewSvg fill='black' size={20} /> Overview</h4>
        </div>

        <div className="welcome__card">
            <h3> Welcome Back, <span className="user__name">{ capitalize(username) }</span></h3>
            <p>Here's how your shops are doing today.</p>
        </div>

        <div className="overview__stats__container">  
          <OverviewStatCard label="Total sales" value="$0" />
          <OverviewStatCard label="Orders" value="0" />
          <OverviewStatCard label="Avg Orders" value="0" />
          <OverviewStatCard label="Visitors" value="0" />
        </div>
        
        <div className="orders__container">
          <div className="subheading">
            <h4> Recent Orders</h4>
            <h4><a href="#"> View all</a></h4>
          </div>

          <StatCard cardColor="var(--light-color)" className="orders">
            <OrderCard orderDetail={{
              img: "",
              orderNumber: "123456",
              price: "$20.99",
              name: "John Doe"
            }} />
            <OrderCard orderDetail={{
              img: "",
              orderNumber: "123456",
              price: "$20.99",
              name: "John Doe"
            }} />
            <OrderCard orderDetail={{
              img: "",
              orderNumber: "123456",
              price: "$20.99",
              name: "John Doe"
            }} />
            <OrderCard orderDetail={{
              img: "",
              orderNumber: "123456",
              price: "$20.99",
              name: "John Doe"
            }} />


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

function OverviewStatCard({label, value}: OverviewStatCardProp) {
  return(
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

function OrderCard({orderDetail}: OrderCardProp) {
  return(
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


