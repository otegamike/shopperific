import { forwardRef } from 'react';
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ content, type = "secondary", state = "default", id, className, style, onClick }, ref) => {
  return (
    <button ref={ref} id={id} className={`button--${type} ${className} button--${state}`} style={style} onClick={onClick} >{content}</button>
  )
})

export default Button