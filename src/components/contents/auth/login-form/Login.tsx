// import css stylesheets
import "./login.css"
import "../auth.css"

//import hooks
import { useState } from "react"
import { useForm } from "../../../../hooks/useForm"

//import components
import Button from "../../../buttons/button"
import FormGroup from "../../../forms/FormGroup"
import LoaderSvg from "../../../../assets/svg/loader"

//import services
import { login } from "../../../../services/authentication"

//import utils
import { alertObj } from "../../../../utils/alerts/alert"



function Login({ switchForm }: { switchForm: (formType: "login" | "register" | "verifyEmail", email?: string) => void }) {

  // hooks
  const { formData, handleChange, handleValidation, isFormValid } = useForm({
    email: "",
    password: ""
  });

  const [ loading , setLoading ] = useState(false);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      // Return if fields are unValidated
      if (!isFormValid) {

        if (Object.values(formData).some(value => value === "")) alertObj("Please fill in all fields", "warning");
        else alertObj("Some Fields are invalid", "warning");
        return setLoading(false);
      }

      // Send login request and await response.
      const result = await login(formData);
      if (!result.authorized) {
        alertObj(result.error, "warning");
      } else if (result.authorized) {
        alertObj("Login successful", "success");
      }
      setLoading(false);
  }

  return (
    <div className="auth__form"> <h2>Login</h2>
      <form action="" onSubmit={handleSubmit}>
        <FormGroup label="Email" type="text" name="email" id="email" formValue={formData.email} onChange={handleChange} validate={true} validateFunction={handleValidation} />
        <FormGroup label="Password" type="password" name="password" id="password" formValue={formData.password} onChange={handleChange} validate={true} validateFunction={handleValidation} /> 
        
        <Button content={loading ? <LoaderSvg /> : "Login"} type="main" className="login__btn full__btn center__content" />
      </form>
      <p>Don't have an account? <a id="switch-form" onClick={() => switchForm("register")}>Register</a></p>
    </div>  
  )
}

export default Login