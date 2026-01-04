import FormGroup from "../../forms/FormGroup"
import Button from "../../buttons/button"

function VerifyEmail() {
  return (
   <div className="auth__form"> <h2>Verify Email</h2>
   <p>We've sent a <strong>6-digit</strong> code to your email. Enter the code to verify your email.</p>
   <form action="">
    <FormGroup label="Enter Code" type="number" name="code" id="code" maxLength={6} />
    <Button content="Verify" type="main" className="auth__btn" />
   </form>
   </div>
  )
}

export default VerifyEmail