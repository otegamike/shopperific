interface inputType  {
  variant: string, 
  label: string,
  name: string, 
  id: string, 
  value?: any,
  maxLength?: number,
  placeholder?: string,
  className?: string ,
  required?: boolean,
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function textarea({
    variant, 
    label, 
    name, 
    id,  
    value, 
    maxLength, 
    placeholder, 
    className ,
    required,
    onBlur , 
    onFocus,
    onChange 
}: inputType) {
  return (
    <textarea
    name={name}
    id={id}
    value={value}
    maxLength={maxLength}
    placeholder={variant === "borderless" ? label : placeholder}
    className={` ${variant === "borderless" ? "borderless__input" : ""} textarea__text ${className}`}
    onBlur={onBlur}
    onFocus={onFocus}
    onChange={onChange}
    required={required?required:false}
    ></textarea>
  )
}

export default textarea