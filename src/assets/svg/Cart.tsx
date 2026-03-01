import type { SvgProps } from "./svgInterface"


const CartSvg =({size = 30, fill = "#f1f2f5",  className, strokeWidth, props}: SvgProps) => {
    return (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        fill="none"
        height={size}
        className={className}
        xmlSpace="preserve"
        {...props}
    >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <path
        d="M6.3 5H21l-2 7H7.377M20 16H8L6 3H3m6 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0m11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        />
    </svg>  
)};
export default CartSvg;