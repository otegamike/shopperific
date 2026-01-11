import type { SvgProps } from "./svgInterface"


const CartSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
      <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <g fill={fill}>
      <circle cx={44} cy={60} r={4} />
      <circle cx={28} cy={60} r={4} />
      <path d="M63.246 21.66A4 4 0 0 0 60 20H18.977L15.934 3.285A4 4 0 0 0 12 0H4C1.789 0 0 1.789 0 4s1.789 4 4 4h4.66l7.406 40.715A4 4 0 0 0 20 52h32a4 4 0 0 0 3.793-2.734l8-24a4 4 0 0 0-.547-3.606" />
    </g>
  </svg>
);
export default CartSvg;