// Components
import Input from './input'
import Textarea from './textarea'
import FileUpload from './file'

// React 
import { useState, useEffect, type ChangeEvent } from 'react'

// Types
import type { handleValidationType, validityType } from '../../types/ValidationInterface'


interface FormGroupProps {
  variant?: string,
  label: string,
  multiple?: boolean,
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
  onChange?: ((e: ChangeEvent<HTMLInputElement>) => void) | ((e: ChangeEvent<HTMLTextAreaElement>) => void),
  validate?: boolean,
  validateFunction?: handleValidationType,
  validity?: validityType;
}

function FormGroup({
  variant,
  label,
  multiple,
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
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<{ state: "idle" | "loading" | "success" | "error", message: string }>({ state: "idle", message: "" });


  useEffect(() => {
    if (validity) {
      if ( name in validity ) {
        setFormState({ 
          state: validity.isValid ? "success" : "error",
          message: validity.message 
        });
      }
    }
  }, [validity]);

  const formType = {
    textarea: <Textarea className={`tall ${formState.state}`} variant={variant ? variant : ""} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} onBlur={() => validateForm()} onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void} />,
    text: <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={() => validateForm()} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />,
    password: <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={() => validateForm()} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />,
    number: <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={() => validateForm()} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />,
    file: <FileUpload className={`tall ${formState.state}`} accept={accept} multiple={multiple} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} onBlur={() => validateForm()} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />
  }

  const validateForm = async () => {
    if (validate && validateFunction && typeof formValue === "string") {

      setFormState({ state: "loading", message: "Loading..." });
      setLoading(true);
      await validateFunction(name, formValue, required);
      // setFormState({ state: result.isValid ? "success" : "error", message: result.message });
      setLoading(false);
    }

  }

  return (
    <div className={`form__group ${className}`}>
      {variant !== "borderless" && <label className="label">{label}</label>}
      {type && (formType[type] || <Input className={`tall ${formState.state}`} variant={variant} type={type} label={label} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={validateForm} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />)}
      <p className={`message ${variant === "borderless" ? "borderless__msg" : ""} ${formState.state === "error" ? "error__message" : "hide"}`} >{formState.message}</p>
    </div>
  )
}

export default FormGroup