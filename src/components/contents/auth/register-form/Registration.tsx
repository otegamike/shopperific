import { useState } from "react"

import "./registration.css"
import Button from "../../../buttons/button"
import FormGroup from "../../../forms/FormGroup"
import { getDeviceId } from "../../../../services/deviceId"

import { register } from "../../../../services/authentication"


function Registration({ switchForm }: { switchForm: () => void }) {
  const deviceId = getDeviceId();
  const [formData, setFormData] = useState({
    deviceId,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await register(formData);
    if (!result.registered) {
      console.log(result.error);
    } 
    if (result.registered) {
      console.log(result.data);
    }
  }
  return (
    <div className="auth__form"> <h2>Registration</h2>
      <form action="" onSubmit={handleSubmit}>
        <FormGroup label="First Name" type="text" name="firstName" id="firstName" onChange={handleChange} />
        <FormGroup label="Last Name" type="text" name="lastName" id="lastName" onChange={handleChange} />
        <FormGroup label="Email" type="text" name="email" id="email" onChange={handleChange} />
        <FormGroup label="Password" type="password" name="password" id="password" onChange={handleChange} />
        <FormGroup label="Confirm Password" type="password" name="confirmPassword" id="confirmPassword" onChange={handleChange} />

        <Button content="Register" type="main" className="login__btn" />
      </form>
      <p>Already have an account? <a id="switch-form" onClick={switchForm}>Login</a></p>
    </div>
  )
}

export default Registration