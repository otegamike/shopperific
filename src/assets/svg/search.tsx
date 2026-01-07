import type { SvgProps } from "./svgInterface"


const SearchSvg =({size = 30, fill = "#211f49", className, props}: SvgProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    stroke={fill}
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M11 6a5 5 0 0 1 5 5m.659 5.655L21 21m-2-10a8 8 0 1 1-16 0 8 8 0 0 1 16 0"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SearchSvg;