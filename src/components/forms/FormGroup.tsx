import React from 'react'
import Input from './input'
import Textarea from './textarea'
import { useState } from 'react'
import { validateForms } from '../../utils/validateForms'



interface FormGroupProps {
  variant?: string,
  label: string,
  type: "text" | "textarea" | "password",
  name: string,
  id: string,
  value?: any,
  formValue?: any,
  maxLength?: number,
  placeholder?: string,
  className?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  validate?: boolean,
  validateFunction?: (key: string, value: boolean) => void,
  message?: string,
  messageClass?: string
}

function FormGroup({
  variant,
  label,
  type,
  name,
  id,
  value,
  formValue,
  maxLength,
  placeholder,
  className,
  onChange,
  validate = false,
  validateFunction,
  message,
  messageClass = "error__message"
}: FormGroupProps) {
  const [formMessage, setFormMessage] = useState(message);
  const [formMessageClass, setFormMessageClass] = useState(messageClass);
  const [formColor, setColor] = useState("");

  const formType = {
    textarea: <Textarea className={`tall ${formColor}`} variant={variant?variant:""} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={()=> validateForm()} onChange={onChange} />,
    text: <Input className={`tall ${formColor}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={()=> validateForm()} onChange={onChange} />,
    password: <Input className={`tall ${formColor}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={()=> validateForm()} onChange={onChange} />
  }

  const validateForm = () => {

    if (validate && validateFunction) {

      if (formValue.length === 0) {
        setFormMessage("This field is required");
        setFormMessageClass("error__message");
        setColor("error");
        return;
      }
      const result = validateForms(name, formValue);
      setFormMessage(result.message);
      setFormMessageClass(result.isValid ? "hide" : "error__message");
      setColor((result.isValid) ? "success" : "error");
      validateFunction(name, result.isValid);
      console.log(formColor);
    }
  }

  return (
    <div className={`form__group ${className}`}>
      {variant !== "borderless" && <label className="label">{label}</label>}
      {type && (formType[type] || <Input className={`tall ${formColor}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={validateForm} onChange={onChange} />)}
      <p className={`message ${formMessageClass}`} >{formMessage}</p>
    </div>
  )
}

export default FormGroup