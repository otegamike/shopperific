import type { SvgProps } from "./svgInterface"


const LogoutSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
    <svg
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        width={size}
        height={size}
        className={className}
        xmlSpace="preserve"
        {...props}
    >
    <g strokeWidth="0"/>
    <g strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M0 0h24v24H0z"/>
    <path d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m4 9V8l-5 4 5 4v-3h6v-2z"/>
    </svg>
);
export default LogoutSvg;