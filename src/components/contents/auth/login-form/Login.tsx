// import css stylesheets
import "./login.css"
import "../auth.css"

//import hooks
import { useForm } from "../../../../hooks/useForm"
import { useAuth } from "../../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

//import components
import Button from "../../../buttons/button"
import FormGroup from "../../../forms/FormGroup"
import LoaderSvg from "../../../../assets/svg/loader"

//import utils
// import { alertObj } from "../../../../utils/alerts/alert"

//itypes
import { EmptyLoginCredentials , type LoginCredentials} from "../../../../types/authContextInterface"


function Login() {

  // hooks
  const navigate = useNavigate();
  const { login } = useAuth();
  const { formData, handleChange, validate, validateAll, loadHandler, isFormValid } = useForm(EmptyLoginCredentials);
  const { loading, buttonState, handleLoading } = loadHandler;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoading("loading", "disable");
    
    // Return if fields are unValidated
    await validateAll();
    if (!isFormValid) {
      handleLoading("idle", "enable");
      return; 
    }

    // Send login request and await response.
    await login(formData);

    navigate("/dashboard");
   
    handleLoading("idle");
  }

  return (
    <>
      <div className="auth__form"> <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <FormGroup<LoginCredentials> label="Email" type="text" name="email" id="email" formValue={formData.email} onChange={handleChange} validate={validate} />
          <FormGroup<LoginCredentials> label="Password" type="password" name="password" id="password" formValue={formData.password} onChange={handleChange} validate={validate} />

          <Button content={loading ? <LoaderSvg /> : "Login"} state={ buttonState } type="main" className="login__btn full__btn center__content" />
        </form>
        <p>Don't have an account? <a id="switch-form" href="/auth/register">Register</a></p>
      </div>

      <div className="auth__images">
      </div>
    </>
  )
}

export default Login