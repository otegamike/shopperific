import type { SvgProps } from "./svgInterface"


const PlusSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => (
    <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width={size}
    height={size}
    className={className}
    xmlSpace="preserve"
    {...props}
    >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <path
            d="M22 17h-5v5a1.001 1.001 0 0 1-2 0v-5h-5a1.001 1.001 0 0 1 0-2h5v-5a1.001 1.001 0 0 1 2 0v5h5a1.001 1.001 0 0 1 0 2M16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0"
            fillRule="evenodd"
        />
    </svg>
);
export default PlusSvg;