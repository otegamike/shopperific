import type { SvgProps } from "./svgInterface"

const AboutSvg =({size = 30, fill = "#f1f2f5", className, props}: SvgProps) => ( 
    <svg
        width={size}
        height={size}
        className={className}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <title>{"about-filled"}</title>
        <path
        d="M256 42.667c117.822 0 213.334 95.512 213.334 213.333 0 117.82-95.512 213.334-213.334 213.334-117.82 0-213.333-95.513-213.333-213.334S138.18 42.667 256 42.667m21.38 192h-42.666v128h42.666zM256.217 144c-15.554 0-26.837 11.22-26.837 26.371 0 15.764 10.986 26.963 26.837 26.963 15.235 0 26.497-11.2 26.497-26.667 0-15.446-11.262-26.667-26.497-26.667"
        fill={fill}
        fillRule="evenodd"
        />
    </svg>
);
export default AboutSvg;