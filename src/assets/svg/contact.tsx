import type { SvgProps } from "./svgInterface"

const ContactSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
  <svg
    fill={fill}
    height={size}
    className={className}
    width={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Zm8-13.5a2 2 0 1 1-2 2 2 2 0 0 1 2-2m-3.789 8.715a4 4 0 0 1 7.578 0 .993.993 0 0 1-.959 1.285H9.18a1 1 0 0 1-.969-1.285" />
  </svg>
);
export default ContactSvg;