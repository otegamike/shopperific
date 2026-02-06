//styles
import "./dashboard.css"

//react
import { useState } from "react"
import { useLocation } from "react-router-dom"

// React Router
import { Outlet } from "react-router-dom"

// Components 
import Header from "../../components/header/Header"
import Sidebar from "./sidebar/Sidebar"

export interface DashboardPagesInterface {
  overview: React.ReactNode;
  products: React.ReactNode;
  orders: React.ReactNode;
  shops: React.ReactNode;
  customers: React.ReactNode;
}

function dashboard() {

  // location state
  const location = useLocation();
  const page = location.pathname.split("/")[2] as keyof DashboardPagesInterface;
  
  // sidebar open state
  const [isSidebarOPen, setIsSidebarOpen] = useState<boolean>(false);
  // active page state
  const [active, setActive] = useState<keyof DashboardPagesInterface>(page || "overview");
 
  // handle sidebar open
  const handleSidebarOpen = (state?:boolean) => {
    if (state===true||state===false) setIsSidebarOpen(state);
    else setIsSidebarOpen(!isSidebarOPen);
  }

  // handle active page
  const handleActive = (e: React.MouseEvent<HTMLLIElement>) => {
    setActive(
      e.currentTarget.id as keyof DashboardPagesInterface
    );
  }

  return (
    <>
      <Header navbar={true} />
      <main className="center__content dashboard__container">
        <div className="dashboard__page">
          <Sidebar active={active} isSidebarOpen={isSidebarOPen} handleSidebarOpen={handleSidebarOpen} handleActive={handleActive} />
          <div className="dashboard__body__container no-scrollbar">
            <div style={ isSidebarOPen? {"--header-left-padding":"2.5rem", paddingLeft: "1rem" }as React.CSSProperties :{paddingLeft: "1rem"}} className="dashboard__body" onClick={() => handleSidebarOpen(false)}>
              <Outlet />
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default dashboard