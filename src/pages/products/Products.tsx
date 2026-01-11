
import ProductCard from '../../components/cards/ProductCard'
import Header from '../../components/header/Header'


const Products = () => {


    return (

        <>
            <Header navbar={true} /> 
            <div>
                <main className='center__content'>
                    <section className='section' >
                        <h3>Products</h3>
                        <div className='products-grid'>
                            <ProductCard orientation='grid' />
                            <ProductCard orientation='grid' />
                            <ProductCard orientation='grid' />
                            <ProductCard orientation='grid' />
                            <ProductCard orientation='grid' />
                            <ProductCard orientation='grid' />
                            <ProductCard orientation='grid' />
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Products