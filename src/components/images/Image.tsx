import { useState } from "react";
import LoaderSvg from "../../assets/svg/loader";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties
}

function Image({ src, alt, className, style }: ImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    }

  return (
    <>
    <img src={src} alt={alt} style={isLoading ? {...style, display: "none"} : style} className={className} loading='lazy' onLoad={handleLoad} />
    {isLoading && <LoaderSvg />}
    </>
  ) 
}

export default Image