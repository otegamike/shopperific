import type { SvgProps } from "./svgInterface"


const CustomersSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
    <svg
        viewBox="0 0 16 16" 
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        width={size}
        height={size}
        className={className}
        xmlSpace="preserve"
        {...props}
    >
    <g stroke-width="0"/>
    <g stroke-linecap="round" stroke-linejoin="round"/>
    <path fill="none" d="M0 0h16v16H0z"/>
    <path d="M16 12.5a2.5 2.5 0 0 0-2.5-2.5h-7A2.5 2.5 0 0 0 4 12.5V15h12zM3 13H0v-2.5A2.5 2.5 0 0 1 2.5 8h4.036c.218.376.495.714.819 1H6.5A3.5 3.5 0 0 0 3 12.5zm7-10a3.001 3.001 0 0 1 0 6 3.001 3.001 0 0 1 0-6M6.126 6.997 6 7a3.001 3.001 0 0 1 0-6c1.026 0 1.932.516 2.473 1.302a4.004 4.004 0 0 0-2.347 4.695"/>
    </svg>
);
export default CustomersSvg;