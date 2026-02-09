
import { motion } from "framer-motion";

interface LogoSvgProps {
    size?: number;
    strokeWidth?: string;
    
}
const LogoLoaderSvg = ({size, strokeWidth = "3rem"}: LogoSvgProps) => (
    <svg
        viewBox="0 0 743 832"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 1.5,
        }}
        height={size}
        width={size}
    >
        <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
            }}
            d="M675.225 769.762c3.002-.509 2.808 1.828 38.058.411 30.692-1.235 58.609-17.175 60.561-36.373 2.106-20.71-9.176-152.741-23.554-260.789-9.259-69.576-6.184-118.312-28.884-142.768-22.439-24.176-69.368-13.105-69.383-12.874m-121.918 28.726c-78.544 6.45-119.919 38.88-136.486 76.541-10.609 24.117-24.788 65.08 19.323 102.038 64.669 54.182 191.02 16.954 228.413 87.173 19.535 36.684 11.287 138.449-81.357 153.045-52.32 8.243-252.081 4.968-274.725.176-27.404-5.8-32.318-24.071-30.273-57.233.922-14.955 36.667-312.45 42.247-338.477 20.061-93.591 108.413-26.12 104.774-69.565-1.791-21.389 5.409-115.248 97.979-115.229 74.291.014 91.059 69.419 83.716 103.345-11.481 53.045-88.057 135.57-34.674 177.758 32.185 25.434 82.546 4.936 87.192-34.88 3.771-32.32-22.216-73.659-63.706-74.002"
            style={{
                fill: "none",
                stroke: "url(#a)",
                strokeWidth: strokeWidth,
            }}
            transform="translate(-314.531 -221.142)scale(1.33364)"
        />
        <defs>
            <linearGradient
                id="a"
                x1={0}
                y1={0}
                x2={1}
                y2={0}
                gradientUnits="userSpaceOnUse"
                gradientTransform="rotate(-5.973 5144.52 -2411.765)scale(450.2352)"
            >
                <stop
                    offset={0}
                    style={{
                        stopColor: "#31abe2",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset={0.25}
                    style={{
                        stopColor: "#5d8adb",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset={0.5}
                    style={{
                        stopColor: "#bf73ae",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset={0.75}
                    style={{
                        stopColor: "#f2797c",
                        stopOpacity: 1,
                    }}
                />
                <stop
                    offset={1}
                    style={{
                        stopColor: "#f87c6e",
                        stopOpacity: 1,
                    }}
                />
            </linearGradient>
        </defs>
    </svg>
);
export default LogoLoaderSvg;
