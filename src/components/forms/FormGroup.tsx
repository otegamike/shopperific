import React from 'react'
import Input from './input'
import Textarea from './textarea'
import { useState, useEffect } from 'react'
import FileUpload from './file'
import type { handleValidationType, validityType } from '../../types/ValidationInterface'


interface FormGroupProps {
  variant?: string,
  label: string,
  type: "text" | "textarea" | "password" | "number" | "file",
  name: string,
  id: string,
  value?: any,
  formValue?: any | string,
  maxLength?: number,
  placeholder?: string,
  className?: string,
  accept?: string,
  required?: boolean,
  disabled?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  validate?: boolean,
  validateFunction?: handleValidationType,
  validity?: validityType
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
  accept,
  required = true,
  disabled = false,
  onChange,
  validate = false,
  validateFunction,
  validity
}: FormGroupProps) {
  const [ loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<{state:"idle" | "loading" | "success" | "error", message: string}>({state: "idle", message: ""});


  useEffect(() => {
    if (validity) {
      setFormState({state: validity.isValid ? "success" : "error", message: validity.message});
    }
  }, [validity]);
  
  const formType = {
    textarea: <Textarea className={`tall ${formState.state}`} variant={variant?variant:""} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} onBlur={()=> validateForm()} onChange={onChange} />,
    text: <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={()=> validateForm()} onChange={onChange} />,
    password: <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={()=> validateForm()} onChange={onChange} />,
    number: <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={()=> validateForm()} onChange={onChange} />,
    file: <FileUpload className={`tall ${formState.state}`} accept={accept} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} onBlur={()=> validateForm()} onChange={onChange} />
  }

  const validateForm = async() => {
    if (validate && validateFunction && typeof formValue === "string") {
      
        setFormState({state: "loading", message: "Loading..."});
        setLoading(true);
        const result = await validateFunction(name, formValue, required);
        setFormState({state: result.isValid ? "success" : "error", message: result.message});
        setLoading(false);
    }

  }

  return (
    <div className={`form__group ${className}`}>
      {variant !== "borderless" && <label className="label">{label}</label>}
      {type && (formType[type] || <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={validateForm} onChange={onChange} />)}
      <p className={`message ${variant === "borderless" ? "borderless__msg" : ""} ${formState.state==="error" ? "error__message" : "hide"}`} >{formState.message}</p>
    </div>
  )
}

export default FormGroup