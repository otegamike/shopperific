import type { SvgProps } from "./svgInterface"


const CartCheck =({size = 30, fill = "#f1f2f5", strokeWidth = 1.5, className, props}: SvgProps) => (
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
        d="m21 5-2 7H7.377M20 16H8L6 3H3m13 2.5h-2.5m0 0H11m2.5 0V8m0-2.5V3M9 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0m11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        />
    </svg>  
);
export default CartCheck;