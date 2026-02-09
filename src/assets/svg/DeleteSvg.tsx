import type { SvgProps } from "./svgInterface"


const DeleteSvg =({size = 30, strokeWidth, fill = "#f1f2f5", className, props}: SvgProps) => (
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
      d="M10 11v6m4-6v6M4 7h16M6 7h12v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3zm3-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9z"
      stroke={fill}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    </svg>  
);
export default DeleteSvg;