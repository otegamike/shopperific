import type { SvgProps } from "./svgInterface"

const ShopSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <title>{"shop"}</title>
    <path
      d="M26.154 0H5.813L0 10h31.967zM29 24H3.003L3 18h1.964c1.074 0 2.777-.958 3.498-2.424C9.271 17.001 10.781 18 12.223 18c1.523 0 3.2-.906 3.76-2.216.561 1.279 2.203 2.216 3.695 2.216 1.48 0 3.013-1.088 3.789-2.574C24.374 16.926 25.665 18 27 18c.293 0 1.744.048 2 0zM.025 12H0c-.018.435 0 1.431 0 2 0 1.065.383 2.229 1.001 3l.03 11c0 2.209 1.847 4 4.125 4h21.655C29.089 32 31 30.209 31 28V17c.7-.824 1-1.67 1-3v-2z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);
export default ShopSvg;
