import "./sections.css"
import ProductCard from "../../cards/ProductCard"

interface SectionProps {
    title: string;
}   

function Section({ title }: SectionProps) {
   return (
    <div className='section'>
      <h3>{title}</h3>

      <div className="products">
        <ProductCard />
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


export default Section