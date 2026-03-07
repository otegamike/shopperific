import { useState, useRef, useEffect } from "react";
import LoaderSvg from "../../assets/svg/loader";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
}

function Image({ src, alt, className, style }: ImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleLoad = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        // If the image is already in cache and finished loading
        if (imgRef.current?.complete) {
            handleLoad();
        }
    }, []);

    return (
        <>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                style={{
                    ...style,
                    display: isLoading ? "none" : (style?.display || "block"),
                }}
                className={className}
                loading="lazy"
                onLoad={handleLoad}
                // Handle potential load errors so the loader doesn't spin forever
                onError={handleLoad} 
            />
            {isLoading && (
                <div className="loader-wrapper">
                    <LoaderSvg />
                </div>
            )}
        </>
    );
}

export default Image;