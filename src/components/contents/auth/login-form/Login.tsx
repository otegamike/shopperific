import "./login.css"
import "../auth.css"
import Input from "../../../forms/input"
import Button from "../../../buttons/button"

function Login({ switchForm }: { switchForm: () => void }) {
  return (
    <div className="auth__form"> <h2>Login</h2>
      <form action="">
        <div className="form__group">
          <label className="label">Email</label>
          <Input className="tall" type="text" name="email" id="email" />
        </div>
        <div className="form__group">
          <label className="label">Password</label>
          <Input className="tall" type="password" name="password" id="password" />
        </div>
        <Button content="Login" type="main" className="login__btn" />
      </form>
      <p>Don't have an account? <a id="switch-form" onClick={switchForm}>Register</a></p>
    </div>
  )
}

export default Login