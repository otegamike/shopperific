import { forwardRef } from 'react';
import "./button.css"
import LoaderSvg from '../../assets/svg/loader';

interface ButtonProps {
  isLoading?: boolean;
  customLoader?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  type?: "main" | "secondary" | "tetirary";
  state?: "default" | "disabled" | "active";
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ content, children, type = "secondary", state = "default", id, className, style, onClick, isLoading, customLoader }, ref) => {

  const buttonContent = children?children:content;
  const loader = customLoader?customLoader:<LoaderSvg size={25} />;
  return (
    <button ref={ref} id={id} className={`button--${type} ${className} button--${state} ${isLoading ? "button--disabled" : ""} `} style={style} onClick={onClick} >{isLoading ? loader : buttonContent}</button>
  )
})

export default Button