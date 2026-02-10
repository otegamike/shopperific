


import OrdersSvg from "../../../assets/svg/orders"
import LoadingComponent from "../../../components/loader/Loading"

function Orders() {
  return (
    <>
        <div className="dashboard__header">
        <h4><OrdersSvg fill='black' size={20} /> Orders</h4>
        </div>
       <LoadingComponent height="62vh" />

    </>
  )
}

export default Orders