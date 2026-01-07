import { useForm } from "../../../../hooks/useForm"

import "./registration.css"
import Button from "../../../buttons/button"
import FormGroup from "../../../forms/FormGroup"
import { getDeviceId } from "../../../../services/deviceId"

import { register } from "../../../../services/authentication"
import { sendVerificationCode } from "../../../../services/authentication"


function Registration({ switchForm }: { switchForm: (formType: "login" | "register" | "verifyEmail", email?: string) => void }) {
  const deviceId = getDeviceId();

  const {
    formData,
    handleChange,
    handleValidation,
    isFormValid
  } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Merge deviceId with form data for submission
    const submissionData = { ...formData, deviceId };

    const result = await register(submissionData);
    if (!result.registered) {
      console.log(result.error);
    } else if (result.registered) {
      console.log(result.data);

      // Send verification code to user's email.
      const sendMail = await sendVerificationCode(formData.email, formData.firstName);
      if (!sendMail.sent) {
        console.log(sendMail.error);
      } else if (sendMail.sent) {
        console.log(sendMail.data);
        // Switch to verifyEmail form.
        switchForm("verifyEmail", formData.email);
      }
    }
  }
  
  return (
    <div className="auth__form"> <h2>Registration</h2>
      <form action="" onSubmit={handleSubmit}>
        <FormGroup label="First Name" type="text" name="firstName" id="firstName" formValue={formData.firstName} validate={true} validateFunction={handleValidation} onChange={handleChange} />
        <FormGroup label="Last Name" type="text" name="lastName" id="lastName" formValue={formData.lastName} validate={true} validateFunction={handleValidation} onChange={handleChange} />
        <FormGroup label="Email" type="text" name="email" id="email" formValue={formData.email} validate={true} validateFunction={handleValidation} onChange={handleChange} />
        <FormGroup label="Password" type="password" name="password" id="password" formValue={formData.password} validate={true} validateFunction={handleValidation} onChange={handleChange} />
        <FormGroup label="Confirm Password" type="password" name="confirmPassword" id="confirmPassword" formValue={formData.confirmPassword} validate={true} validateFunction={handleValidation} onChange={handleChange} />

        <Button content="Register" type="main" className="login__btn full__btn" state={isFormValid ? "default" : "disabled"} />
      </form>
      <p>Already have an account? <a id="switch-form" onClick={() => switchForm("login")}>Login</a></p>
    </div>
  )
}

export default Registration