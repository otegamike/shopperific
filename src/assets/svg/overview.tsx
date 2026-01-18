import type { SvgProps } from "./svgInterface";

const overviewSvg = ({size = 30, fill = "var(--panel-color-dark)", className, props}: SvgProps) => (
  <svg
    fill={fill}
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <rect x={2} y={2} width={9} height={11} rx={2} />
    <rect x={13} y={2} width={9} height={7} rx={2} />
    <rect x={2} y={15} width={9} height={7} rx={2} />
    <rect x={13} y={11} width={9} height={11} rx={2} />
  </svg>
);
export default overviewSvg;
