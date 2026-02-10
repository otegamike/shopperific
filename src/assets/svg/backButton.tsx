import type { SvgProps } from "./svgInterface"


const CartCheck =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
    <svg
        viewBox="0 0 42 42"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        fill={fill}
        height={size}
        className={className}
        xmlSpace="preserve"
        baseProfile="tiny"
        {...props}
    >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <path
        fillRule="evenodd"
        d="M31 38.32 13.391 21 31 3.68 28.279 1 8 21.01 28.279 41z"
        />
    </svg>  
);
export default CartCheck;