//react 
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// components
import Header from "../../components/header/Header"
import BecomeSellerContent from "../../components/contents/becomeSeller/BecomeSellerContent"

// utils
import { alertObj } from "../../utils/alerts/alert"

// services
import { newSeller } from "../../services/newSeller"

// hooks 
import { useAuth } from "../../hooks/useAuth"

//types 
import type { ClientUser } from "../../types/clientUser"

function BecomeSeller() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)


  const handleAction = async () => {
    setLoading(true);
    if (!user) {
      alertObj("You must be logged in to become a seller", "error")
      navigate("/auth", { replace: true });
      return;
    };

    const addNewSeller = await newSeller();

    if (addNewSeller.success) {
      const newUser: ClientUser = { ...user, role: "seller" };
      updateUser(newUser)
      alertObj(addNewSeller.message, 'success')
      navigate("/new-shop", { replace: true });
      return;

    } else {
      alertObj(addNewSeller.errorMsg, 'error')
    }

    setLoading(false);
  }

  return (
    <>
      <Header navbar />
      <main className="center__content">
        <section className="section" style={{ padding: "1rem 1rem", }}>
          <BecomeSellerContent action={handleAction} loading={loading} />
        </section>
      </main>
    </>
  )
}

export default BecomeSeller