import { useState } from "react"
import FormGroup from "../../forms/FormGroup"
import Button from "../../buttons/button"
import { verifyUserEmail } from "../../../services/authentication";


interface VerifyEmailProps {
  email: string
}
function VerifyEmail({ email }: VerifyEmailProps) {

  const [code, setCode] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 6) {
      setCode(val);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length !== 6) {
      return;
    }
    const verify = await verifyUserEmail(code);
    if (verify.verified) {
      console.log("Verification successful");
    }

    console.log("Verification failed");
  }

  return (
    <div className="auth__form"> <h2>Verify Email</h2>
      <div className="text__group">
        <p>We've sent a <strong>6-digit</strong> code to your email. </p>
        <h3>{email}</h3>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <FormGroup label="Enter Code" type="number" name="code" id="code" value={code.toString()} maxLength={6} onChange={handleChange} />
        <Button content="Verify" type="main" className="auth__btn full__btn" />
      </form>
    </div>
  )
}

export default VerifyEmail