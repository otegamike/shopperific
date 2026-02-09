import type { SvgProps } from "./svgInterface"


const CollapseSvg =({size = 30, strokeWidth, fill = "#f1f2f5", className, props}: SvgProps) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        fill={fill}
        height={size}
        className={className}
        xmlSpace="preserve"
        {...props}
    >
     
    <g strokeWidth={strokeWidth} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <g data-name="Layer 2">
      <path
        d="M19 9h-2.58l3.29-3.29a1 1 0 1 0-1.42-1.42L15 7.57V5a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2m-9 4H5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 16.42V19a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1"
        data-name="collapse"
      />
    </g>
    </svg>  
);
export default CollapseSvg;