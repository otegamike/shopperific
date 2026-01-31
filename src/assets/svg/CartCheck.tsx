import type { SvgProps } from "./svgInterface"


const CartCheck =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        fill="transparent"
        height={size}
        className={className}
        xmlSpace="preserve"
        {...props}
    >
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier">
            <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 6L13 8L17 4M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>  
);
export default CartCheck;