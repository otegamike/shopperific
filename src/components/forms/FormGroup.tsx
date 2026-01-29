// Components
import Input from './input'
import Textarea from './textarea'

// React 
import { useState, useEffect, type ChangeEvent } from 'react'

// Types
import type { validationInterface } from '../../types/ValidationInterface'

// util
import { alertObj } from '../../utils/alerts/alert'

interface FormGroupProps<T> {
  variant?: string,
  label: string,
  multiple?: boolean,
  type: "text" | "textarea" | "password" | "number",
  name: keyof T,
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
  validate?: validationInterface<T>
}

function FormGroup<T>({
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
  required = false,
  disabled = false,
  onChange,
  validate
}: FormGroupProps<T>) {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<{ state: "idle" | "loading" | "success" | "error", message: string }>({ state: "idle", message: "" });
  const [showError, setShowError] = useState(false);

  const { validateFunction, validity, setShowError: setShowErrorFromProps } = validate || {};

  useEffect(() => {
    if (validity && validity[name]) {
      setFormState({
        state: validity[name].isValid ? "success" : "error",
        message: validity[name].message
      });

      setShowError(validity[name].showError);
    }
  }, [validity?.[name]]);

  const validateForm = async () => {
    if (setShowErrorFromProps) setShowErrorFromProps(name, true);
    if (validate && validateFunction && typeof formValue === "string") {

      setFormState({ state: "loading", message: "Loading..." });
      setLoading(true);
      await validateFunction(name, formValue, required);
      // setFormState({ state: result.isValid ? "success" : "error", message: result.message });
      setLoading(false);
    }

  }

  const handleFocus = () => {
    
    if (setShowErrorFromProps) setShowErrorFromProps(name, false);
  }

  const formComponents = {
    textInputs: <Input className={`tall ${showError ? formState.state : ""}`} variant={variant} type={type} label={label} name={name as string} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={() => validateForm()} onFocus={handleFocus} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />,
    textareaInputs: <Textarea className={`tall ${showError ? formState.state : ""}`} variant={variant ? variant : ""} label={label} name={name as string} id={id} value={value} maxLength={maxLength} placeholder={placeholder} required={required} onBlur={() => validateForm()} onFocus={handleFocus} onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void} />
  }

  const formType = {
    textarea: formComponents.textareaInputs,
    text: formComponents.textInputs,
    password: formComponents.textInputs,
    number: formComponents.textInputs
  }

  return (
    <div className={`form__group ${className}`}>
      {variant !== "borderless" && <label className="label">{label}</label>}
      {type && (formType[type] || <Input className={`tall ${showError ? formState.state : ""}`} variant={variant} type={type} label={label} name={name as string} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={validateForm} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />)}
      <p className={`message ${variant === "borderless" ? "borderless__msg" : ""} ${showError && formState.state === "error" ? "error__message" : "hide"}`} >{ formState.message }</p>
    </div>
  )
}

export default FormGroup