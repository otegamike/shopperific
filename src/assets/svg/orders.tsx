import type { SvgProps } from "./svgInterface"


const OrdersSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
      <svg
    viewBox="0 0 52 52" 
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
  <path d="M24.3 36.5c.7 0 1.4.1 2 .3L15.5 6.2l-1-3c-.3-.9-1.2-1.3-2-1L3.1 5.3c-.9.3-1.3 1.2-1 2l1 3c.3.9 1.2 1.3 2 1L10 9.7l9.9 28.1c1.3-.8 2.8-1.3 4.4-1.3m16.9-7.3-9.9 3.5c-1 .4-2.2-.2-2.5-1.2l-3.5-9.9c-.4-1 .2-2.2 1.2-2.5l9.9-3.5c1-.4 2.2.2 2.5 1.2l3.5 9.9c.4 1-.2 2.1-1.2 2.5m-9.4-16.3-6.7 2.3c-1 .4-2.2-.2-2.5-1.2l-2.3-6.7c-.4-1 .2-2.2 1.2-2.5l6.7-2.3c1-.4 2.2.2 2.5 1.2l2.3 6.7c.4.9-.1 2.1-1.2 2.5m18.1 22.6-1-3c-.3-.9-1.2-1.3-2-1l-18.2 6.3c1.9 1.2 3.2 3.2 3.6 5.5L49 37.6c.8-.3 1.2-1.2.9-2.1m-25.6 3.6c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5c0-3.1-2.5-5.5-5.5-5.5"/>
  </svg>
);
export default OrdersSvg;