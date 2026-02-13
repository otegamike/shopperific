// css
import "./product-details.css"

// react
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// types
import type { ProductType } from '../../types/productInterface/productInterface'

// svg
import BackButton from "../../assets/svg/backButton";

// hooks
import { useNavigate } from "react-router-dom";
import { useElementOnScreen } from "../../hooks/useElementOnScreen";

interface ProductDetailsProps {
    product: ProductType;
}

function ProductDetails({ product }: ProductDetailsProps) {

    return (
        <div className="product__details">
            <ProductImageCarousel images={product.images || []} />
            <div className="product__info">
                <div className="product__name__container">
                    <p className="product__shopName">{product.shopName}</p>
                    <h1 className="product__name">{product.name}</h1>
                </div>
                <p className="product__price">${product.price}</p>
                <p className="product__description">{product.description}</p>
                <p className="product__stock">{product.stock}</p>
                <p className="product__category">{product.category}</p>
            </div>
        </div>
    )
}

export default ProductDetails

export const ProductHeading = ({ productName }: { productName: string }) => {
    const navigate = useNavigate();
    const goToPreviousPage = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="product__header">
                <span className="back" onClick={() => goToPreviousPage()}>
                    <BackButton size={15} fill="var(--text-primary)" />
                    Products
                </span> <span className="slash">|</span> {productName}
            </div>
        </>
    )
}


const observerOptions = { threshold: 0.95 };

const ProductImageCarousel = ({ images }: { images: string[] }) => {

    const [containerRef, isVisible] = useElementOnScreen(observerOptions);
    const [activeImage, setActiveImage] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const focusImage = (index: number) => {
        setActiveImage(index);
    }

    useEffect(() => {
        const id = `image-${activeImage}`;
        const image = document.getElementById(id);
        image?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
    }, [activeImage]);

    useEffect(() => {
        if (!isVisible || isHovered) return;
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % (images.length || 1));
        }, 3500);
        return () => clearInterval(interval);
    }, [images.length, activeImage, isVisible, isHovered]);

    return (
        <div ref={containerRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="product__images__container">
            <div className="product__images no-scrollbar">
                {images.map((image, index) => {
                    return <img key={image} id={`image-${index}`} src={image} alt="" />
                })}
            </div>
            <div className="product__image__dots center__content" >
                {images.map((_, index) => {
                    return <motion.div onClick={() => focusImage(index)} key={index} className={`dot ${index === activeImage ? "active" : ""}`} ></motion.div>
                })}
            </div>
        </div>
    )
}





