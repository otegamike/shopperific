import type { SvgProps } from "./svgInterface"

const UserSvg =({size = 30, fill = "#7086e0", className, props}: SvgProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <title>{"user-profile-circle-solid"}</title>
    <g data-name="Layer 2">
      <path fill="none" data-name="invisible box" d="M0 0h48v48H0z" />
      <path
        d="M24 2a22 22 0 1 0 22 22A21.9 21.9 0 0 0 24 2m0 8a8 8 0 1 1-8 8 8 8 0 0 1 8-8m0 32a18.2 18.2 0 0 1-12.2-4.8A26.4 26.4 0 0 1 24 34a26.4 26.4 0 0 1 12.2 3.2A18.2 18.2 0 0 1 24 42"
        data-name="icons Q2"
      />
    </g>
  </svg>

);
export default UserSvg;