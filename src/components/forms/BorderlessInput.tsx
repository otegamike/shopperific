
import { PasswordShow , PasswordHide } from "../../assets/svg/passwordshow"
import { useState } from "react"

interface inputType  {
  type: string, 
  label: string,
  name: string, 
  id: string, 
  value?: any,
  maxLength?: number,
  placeholder?: string,
  className?: string ,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function BorderlessInput({ type, label,  name, id, value, maxLength, placeholder, className , onBlur, onChange }: inputType) {
  const [formType, setFormType ] = useState(type);

  return (
    <div className="input__container">
      <input 
        className={`input__text borderless__input ${className}`} 
        type={formType} 
        name={name} id={id} 
        value={value} 
        placeholder={label} 
        onChange={onChange} 
        maxLength={maxLength} 
        onBlur={onBlur} 
      />
      
      {(formType === "text" && type==="password") && <span onClick={() => setFormType("password")} className="password__show"><PasswordShow size={25} /> </span>}
      {(formType === "password" && type==="password") && <span onClick={() => setFormType("text")} className="password__hide"><PasswordHide size={25} /> </span>}
    </div>
  )
}

export default BorderlessInput