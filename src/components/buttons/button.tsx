import "./button.css"

interface ButtonProps {
    content: React.ReactNode; 
    type?: "main" | "secondary";
    state?: "default" | "disabled" | "active";
    id?: string;
    className?: string;
    onClick?: () => void;
}

function Button({ content, type  = "secondary" , state = "default" , id , className , onClick }: ButtonProps) {
  return (
    <button id={id} className={`button button--${type} ${className} button--${state}`} onClick={onClick} >{ content }</button>
  )
}

export default Button