import type { SvgProps } from "./svgInterface"


const ExpandSvg =({size = 30, strokeWidth, fill = "#f1f2f5", className, props}: SvgProps) => (
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
     
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M21 14v2.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H14M10 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8V10m12-1 6-6m0 0h-6m6 0v6M9 15l-6 6m0 0h6m-6 0v-6"
      stroke={fill}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    </svg>  
);
export default ExpandSvg;