
interface inputType  {
  type: string, 
  accept?: string,
  variant?: string,
  label: string,
  name: string, 
  id: string, 
  value?: any,
  maxLength?: number,
  placeholder?: string,
  required?: boolean,
  className?: string ,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function fileUpload({ type, accept = "image/*", variant, label, name, id, value, maxLength, placeholder, className , required, onBlur, onChange }: inputType) {
 
  return (
    <div className="input__container">
      {variant==="borderless_input" && <label htmlFor={id}>{label}</label>}
      <input 
        className={`input__text ${className}`} 
        type={type} 
        accept={accept}
        name={name} id={id} 
        value={value} 
        placeholder={variant==="borderless_input" ? label : placeholder} 
        onChange={onChange} 
        maxLength={maxLength} 
        onBlur={onBlur} 
        required={required}
      />

    </div>
  )
}

export default fileUpload