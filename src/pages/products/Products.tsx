import { ProductCardComponent } from '../../components/cards/ProductCard'
import Header from '../../components/header/Header'

// services
import { fetchProducts } from '../../services/fetchProducts'

// types
import type { ProductDataType } from '../../types/productInterface/productInterface'
import type { ErrorObject } from '../../types/errorComponentInterface'

// react
import { useState, useEffect } from 'react'

// components
import InfiniteScrollGrid from '../../components/common/InfiniteScrollGrid'

const Products = () => {
    const [products, setProducts] = useState<ProductDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [errorObj, setErrorObj] = useState<ErrorObject>({ errorState: false, errorMsg: "" });

    const loadProducts = async (pageToLoad: number) => {
        setIsFetching(true);
        try {
            const res = await fetchProducts(pageToLoad);

            let newProducts: ProductDataType[] = [];

            if (Array.isArray(res)) {
                newProducts = res;
            } else if (res && typeof res === 'object' && 'products' in res) {
                newProducts = (res as any).products;
            } else if ("errorMsg" in res) {
                setErrorObj({ errorState: true, errorMsg: res.errorMsg });
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
            setErrorObj({ errorState: true, errorMsg: "Failed to load products" });
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    }

    const handleRetry = async () => {
        setErrorObj({ errorState: false, errorMsg: "" });
        await loadProducts(page);
    }



    useEffect(() => {
        loadProducts(page)
    }, [page])

    return (

        <>
            <Header navbar={true} />
            <div>
                <main className='center__content main-page'>
                    <section className='products-container section' style={{ paddingLeft: "1rem" }} >
                        <h3>Products</h3>


                        <InfiniteScrollGrid

                            data={products}
                            loading={loading || isFetching}
                            hasMore={hasMore}
                            onLoadMore={() => setPage(prev => prev + 1)}
                            error={{ ...errorObj, retry: handleRetry }}
                            renderItem={(product) => (
                                <ProductCardComponent
                                    orientation='grid'
                                    loading={false}
                                    product={product}
                                />
                            )}
                            skeletonComponent={
                                Array.from({ length: 4 }).map((_, index) => (
                                    <ProductCardComponent key={`skeleton-${index}`} orientation='grid' loading={true} />
                                ))
                            }
                        />
                    </section>
                </main>
            </div>
        </>
    )
}

export default Products