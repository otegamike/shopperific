import "./forms.css"

interface inputType  {
  type: string, 
  name: string, 
  id: string, 
  maxLength?: number,
  placeholder?: string,
  className?: string ,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ type, name, id, maxLength, placeholder, className , onChange }: inputType) {
  return (
    <>
    <input className={`input__text ${className}`} type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} maxLength={maxLength} />
    </>
  )
}

export default Input