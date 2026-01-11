


import "./card.css"

interface ProductCardProps {
    orientation?: string;
    className?: string;
    loading?: boolean;
}

function ProductCard({ orientation = "row", className, loading = true }: ProductCardProps) {
    return (
        <div className={`product__card ${orientation} ${className}`}>
            <span className={`product__image  ${loading ? "skeleton__loader" : ""}`}></span>
            <span className={`product__name ${loading ? "skeleton__loader" : ""}`}></span>
            <span className="product__actions">
                <span className={`product__price ${loading ? "skeleton__loader" : ""}`}></span>
                <span className={`product__button ${loading ? "skeleton__loader" : ""}`}></span>
            </span>
        </div>
    )
}

export default ProductCard