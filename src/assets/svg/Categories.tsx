import type { SvgProps } from "./svgInterface"


const CategoriesSvg =({size = 30, fill = "#f1f2f5", className, props, strokeWidth = 2.5}: SvgProps) => (
   <svg
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    xmlSpace="preserve"
    {...props}
  >
        <g strokeWidth={0} />
        <g
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={fill}
        strokeWidth={0.096}
        /> 
        <g
        clipPath="url(#categories_svg_clipPath)"
        stroke={fill}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <circle cx={17} cy={7} r={3} />
        <circle cx={7} cy={17} r={3} />
        <path d="M14 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 4h6v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
        </g>
        <defs>
        <clipPath id="categories_svg_clipPath">
            <path fill="transparent" d="M0 0h24v24H0z" />
        </clipPath>
        </defs>
     </svg>
);
export default CategoriesSvg;