import Card from "../components/cards/Card"
import Header from "../components/header/Header"
import Login from "../components/contents/auth/login-form/Login"
import Registration from "../components/contents/auth/register-form/Registration"
import VerifyEmail from "../components/contents/auth/VerifyEmail"
import { useState } from "react"

function SignIn() {

  const [formType, setFormType] = useState<"login" | "register" | "verifyEmail">("login");

  const switchForm = (formType: "login" | "register" | "verifyEmail") => {
    setFormType(formType);
  }

  const Form = (formType: "login" | "register" | "verifyEmail") => {
    if (formType === "login") {
      return <Login switchForm={() => switchForm("register")} />
    } else if (formType === "register") {
      return <Registration switchForm={() => switchForm("verifyEmail")} />
    } else {
      return <VerifyEmail />
    }
  }


  return (
    <main>
      <Header />
      <div className="auth__card">
        <Card content={Form(formType)} />
      </div>
    </main>
  )
}

export default SignIn