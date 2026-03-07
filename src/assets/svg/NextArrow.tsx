import type { SvgProps } from "./svgInterface"


const NextArrow =({size = 30, fill = "#f1f2f5", strokeWidth = 2.064, className, props}: SvgProps) => {
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
        <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.293 4.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414-1.414L17.586 13H4a1 1 0 1 1 0-2h13.586l-5.293-5.293a1 1 0 0 1 0-1.414"
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={fill}
        strokeWidth={strokeWidth}
        />
        <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.293 4.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414-1.414L17.586 13H4a1 1 0 1 1 0-2h13.586l-5.293-5.293a1 1 0 0 1 0-1.414"
        fill={fill}
        />
    </svg>  
)};
export default NextArrow;