import React from 'react'
import Input from './input'

interface FormGroupProps {
    label: string,
    type: string,
    name: string,
    id: string,
    value?: any,
    maxLength?: number,
    placeholder?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FormGroup({ label, type, name, id,  value, maxLength, placeholder, className , onChange }: FormGroupProps) {
  return (
    <div className={`form__group ${className}`}>
        <label className="label">{label}</label>
        <Input className="tall" type={type} name={name} id={id} value={value} maxLength={maxLength} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}

export default FormGroup