// css
import "./product-details.css"

// types
import type { ProductType } from '../../types/productInterface/productInterface'

// svg
import BackButton from "../../assets/svg/backButton";

// hooks
import { useNavigate } from "react-router-dom";

interface ProductDetailsProps {
    product: ProductType;
}

function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="product__details">
        <div className="product__images no-scrollbar">
           {product.images?.map((image) => {
             return <img src={image} alt="" />
           })}
        </div>
        <div className="product__info">
            <h1 className="product__name">{product.name} {product.images?.length}</h1>
            <p className="product__price">${product.price}</p>
            <p className="product__description">{product.description}</p>
            <p className="product__stock">{product.stock}</p>
            <p className="product__category">{product.category}</p>
            <p className="product__shopName">{product.shopName}</p>
        </div>
    </div>
  )
}

export default ProductDetails

export const ProductHeading = ({productName}: {productName: string}) => {
    const navigate = useNavigate();
    const goToPreviousPage = () => {
        navigate(-1);
    }

    return (
        <>
            <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem"}} onClick={() => goToPreviousPage()}>
                <BackButton size={15} fill="var(--text-primary)" /> 
                <h4>Products / {productName}</h4>
            </div>
        </>
    )
}