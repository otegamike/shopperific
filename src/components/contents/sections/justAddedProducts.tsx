import "./sections.css"
import ProductCard from "../../cards/ProductCard"

function JustAddedProducts() {
  return (
    <div className='section'>
      <h3>Just Added Products</h3>

      <div className="products">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default JustAddedProducts