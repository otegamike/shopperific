import "./button.css"

interface ButtonProps {
    content: React.ReactNode; 
    type?: "main" | "secondary";
    state?: "default" | "disabled" | "active";
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

function Button({ content, type  = "secondary" , state = "default" , id , className , style , onClick }: ButtonProps) {
  return (
    <button id={id} className={`button--${type} ${className} button--${state}`} style={style} onClick={onClick} >{ content }</button>
  )
}

export default Button