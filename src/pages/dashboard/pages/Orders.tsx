


import OrdersSvg from "../../../assets/svg/orders"

import LogoLoaderSvg from "../../../assets/svg/LogoSvg"

function Orders() {
  return (
    <>
        <div className="dashboard__header">
        <h4><OrdersSvg fill='black' size={20} /> Orders</h4>
        </div>
        <div className="center__content" style={{height: "250px"}}>
          <LogoLoaderSvg size={40} />
        </div>

    </>
  )
}

export default Orders