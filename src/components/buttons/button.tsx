import "./button.css"

interface ButtonProps {
    content: string , 
    type?: "main" | "secondary", 
    state?: "default" | "disabled" | "active"
    className?: string;
    onClick?: () => void;
}

function Button({ content, type = "secondary" , state = "default" , className , onClick }: ButtonProps) {
  return (
    <button className={`button button--${type} ${className} button--${state}`} onClick={onClick} >{ content }</button>
  )
}

export default Button