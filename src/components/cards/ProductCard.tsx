


import "./card.css"

interface ProductCardProps {
    orientation?: string;
}

function ProductCard({ orientation = "row" }: ProductCardProps) {
    return (
        <div className={`product__card ${orientation}`}>
            <span className="product__image"></span>
            <span className="product__name"></span>
            <span className="product__actions">
                <span className="product__price"></span>
                <span className="product__button"></span>
            </span>
        </div>
    )
}

export default ProductCard