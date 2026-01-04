import Card from "../components/cards/Card"
import Header from "../components/header/Header"
import Login from "../components/contents/auth/login-form/Login"
import Registration from "../components/contents/auth/register-form/Registration"
import VerifyEmail from "../components/contents/auth/VerifyEmail"
import { useState } from "react"

function SignIn() {

  const [formType, setFormType] = useState<"login" | "register" | "verifyEmail">("login");
  const [userEmail, setUserEmail] = useState<string>("");

  const switchForm = (formType: "login" | "register" | "verifyEmail" , email?: string) => {
    setFormType(formType);
    if (email && formType === "verifyEmail") {
      setUserEmail(email);
    }
  }

  const Form = (formType: "login" | "register" | "verifyEmail", email?: string) => {
    if (formType === "login") {
      return <Login switchForm={switchForm} />
    } else if (formType === "register") {
      return <Registration switchForm={switchForm} />
    } else if (formType === "verifyEmail" && email) {
      return <VerifyEmail email={email} />
    }
  }


  return (
    <main>
      <Header />
      <div className="auth__card">
        <Card content={Form(formType, userEmail)} />
      </div>
    </main>
  )
}

export default SignIn