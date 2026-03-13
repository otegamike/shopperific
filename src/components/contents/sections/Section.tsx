import "./sections.css"
import { ProductCardComponent } from "../../cards/ProductCard"
import { type ProductDataType } from "../../../types/productInterface/productInterface";

interface SectionProps {
    title: string;
    products: ProductDataType[];
    isLoading: boolean;
}   

function Section({ title, products, isLoading }: SectionProps) {
  
   return (
    <div className='section'>
      <h3>{title}</h3>

      <div className="products products-row">
        {products?.length > 0 ? products.map((product) => (
          <ProductCardComponent loading={isLoading} key={`product-${product._id}`} product={product} />
        )) : Array.from({ length: 6 }, (_, i) => (
          <ProductCardComponent key={`product-${i}`} loading={true} />
        ))}
      </div>
    </div>
  )
}


export default Section