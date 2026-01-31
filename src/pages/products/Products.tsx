import ProductCard from '../../components/cards/ProductCard'
import Header from '../../components/header/Header'

// services
import { fetchProducts } from '../../services/fetchProducts'

// types
import type { ProductType } from '../../types/productInterface/productInterface'

// react
import { useState, useEffect, useRef, useCallback } from 'react'

const Products = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || isFetching) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, isFetching, hasMore]);


    const loadProducts = async (pageToLoad: number) => {
        setIsFetching(true);
        try {
            const res = await fetchProducts(pageToLoad);

            let newProducts: ProductType[] = [];

            if (Array.isArray(res)) {
                newProducts = res;
            } else if (res && typeof res === 'object' && 'products' in res) {
                newProducts = (res as any).products;
            } else {
                console.error("Unexpected response format", res);
            }

            if (newProducts.length === 0) {
                setHasMore(false);
            } else {
                setProducts(prev => {
                    // Check for duplicates just in case, though backend pagination should handle it
                    const existingIds = new Set(prev.map(p => p._id));
                    const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p._id));
                    return [...prev, ...uniqueNewProducts];
                });
            }

        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    }

    useEffect(() => {
        loadProducts(page)
    }, [page])

    return (

        <>
            <Header navbar={true} />
            <div>
                <main className='center__content'>
                    <section className='section' >
                        <h3>Products</h3>
                        <div className='products-grid'>
                            {products.map((product, index) => {
                                if (products.length === index + 1) {
                                    return (
                                        <div ref={lastProductElementRef} key={product._id} style={{ display: 'contents' }}>
                                            <ProductCard
                                                orientation='grid'
                                                loading={false}
                                                product={product}
                                            />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <ProductCard
                                            key={product._id}
                                            orientation='grid'
                                            loading={false}
                                            product={product}
                                        />
                                    )
                                }
                            })}
                            {/* Show skeleton loading when fetching more or initial load */}
                            {(loading || isFetching) && (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <ProductCard key={`skeleton-${index}`} orientation='grid' loading={true} />
                                ))
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}

export default Products