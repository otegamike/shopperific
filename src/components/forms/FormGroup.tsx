// Components
import Input from './input'
import Textarea from './textarea'

// Context
import { FormGroupContext } from '../../context/formGroupContext'

// React 
import { useState, useEffect, type ChangeEvent } from 'react'
import { motion, type Variants } from 'framer-motion'

// Types
import type { validationInterface } from '../../types/ValidationInterface'

interface FormGroupProps<T> {
  children?: React.ReactNode,
  variant?: string,
  label?: string,
  multiple?: boolean,
  type: "text" | "textarea" | "password" | "number" | "children",
  name: keyof T,
  id?: string,
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
  children,
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
  const [isFocused, setIsFocused] = useState(false);

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
    setIsFocused(false);
    if (setShowErrorFromProps) setShowErrorFromProps(name, true);
    if (validate && validateFunction) {
      setFormState({ state: "loading", message: "Loading..." });
      setLoading(true);
      await validateFunction(name, formValue, required);
      setLoading(false);
    }

  }

  const handleFocus = () => {
    setIsFocused(true);
    if (setShowErrorFromProps) setShowErrorFromProps(name, false);
  }

  const formComponents = {
    children: <FormGroupContextProvider isFocused={isFocused} handleBlur={validateForm} handleFocus={handleFocus}>{children}</FormGroupContextProvider>,
    textInputs: <Input className={`tall ${showError ? formState.state : ""}`} variant={variant} type={type} label={label || ""} name={name as string} id={id || ""} value={formValue} maxLength={maxLength} placeholder={placeholder} required={required} loading={loading} disabled={disabled} onBlur={() => validateForm()} onFocus={handleFocus} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />,
    textareaInputs: <Textarea className={`tall ${showError ? formState.state : ""}`} variant={variant ? variant : ""} label={label || ""} name={name as string} id={id || ""} value={formValue} maxLength={maxLength} placeholder={placeholder} required={required} onBlur={() => validateForm()} onFocus={handleFocus} onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void} />
  }

  const formType = {
    textarea: formComponents.textareaInputs,
    text: formComponents.textInputs,
    password: formComponents.textInputs,
    number: formComponents.textInputs,
    children: formComponents.children
  }

  return (
    <div className={`form__group ${className}`} style={{position: "relative"}}>
      {variant === "borderless"? 
         <motion.label className="label" variants={labelVariants} animate={isFocused || formValue && formValue !== "" ? "formFilled" : "formEmpty"} style={labelStyle} transition={{ duration: 0.4 }}>{label}</motion.label> 
        : <label className="label">{label}</label>}
      {type && (formType[type] || <Input className={`tall ${showError ? formState.state : ""}`} variant={variant} type={type} label={label || ""} name={name as string} id={id || ""} value={value} maxLength={maxLength} placeholder={placeholder} onBlur={validateForm} onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void} />)}
      <p className={`message ${variant === "borderless" ? "borderless__msg" : ""} ${showError && formState.state === "error" ? "error__message" : "hide"}`} >{ formState.message }</p>
    </div>
  )
}

export default FormGroup

interface FormGroupContextProviderProps {
  children: React.ReactNode;
  isFocused?: boolean;
  handleFocus: () => void;
  handleBlur: () => Promise<void>;
}

const FormGroupContextProvider = ({ children, isFocused, handleBlur, handleFocus }: FormGroupContextProviderProps ) => {
  return (
    <FormGroupContext.Provider value={{ isFocused, handleFocus, handleBlur }}>
      {children}
    </FormGroupContext.Provider>
  );
};

const labelVariants: Variants = {
  formEmpty: { 
    opacity: 1, 
    y: 11 ,
    x: 4,
    backgroundColor: "transparent", 
    fontSize: "1rem",
    fontWeight: "400",
    color: "var(--panel-color-dark-transparent)"
  },
  formFilled: { 
    opacity: 1, 
    fontSize: "0.75rem",
    y: -10 },
};

const labelStyle: React.CSSProperties = {
  position: "absolute",
  top: "0.5rem",
  left: "1rem",
  fontSize: "0.75rem",
  fontWeight: "500",
  y: -10,
  zIndex: 2,
  backgroundColor: "var(--light-color)",
  color: "hsl(228 14% 25% /0.8 )",
  padding: "0 0.3rem",
  borderRadius: "0.5rem",
  pointerEvents: "none"

}
