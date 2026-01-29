import "./forms.css"
import { PasswordShow , PasswordHide } from "../../assets/svg/passwordshow"
import Loading from "../../assets/svg/loading"
import { useState } from "react"

interface inputType  {
  variant?: string,
  type: string, 
  label: string,
  name: string, 
  id: string, 
  value?: any,
  maxLength?: number,
  placeholder?: string,
  className?: string ,
  required?: boolean,
  disabled?: boolean,
  loading?: boolean,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ variant, type, label, name, id, value, maxLength, placeholder, className , required, disabled=false, loading=false, onBlur, onFocus, onChange }: inputType) {
  const [formType, setFormType ] = useState(type);

  return (
    <div className="input__container">
      <input 
        className={`input__text ${variant === "borderless" ? "borderless__input" : ""} ${className}`} 
        type={formType} 
        name={name} id={id} 
        value={value} 
        placeholder={variant === "borderless" ? label : placeholder} 
        onChange={onChange} 
        required={required}
        disabled={disabled}
        maxLength={maxLength} 
        onBlur={onBlur} 
        onFocus={onFocus}
      />
      {loading && <span className="form__icon"><Loading className="spinner" size={20} /></span>}
      {(formType === "text" && type==="password") && <span onClick={() => setFormType("password")} className="form__icon password__show"><PasswordShow size={25} /> </span>}
      {(formType === "password" && type==="password") && <span onClick={() => setFormType("text")} className="form__icon password__hide"><PasswordHide size={25} /> </span>}
    </div>
  )
}

export default Input