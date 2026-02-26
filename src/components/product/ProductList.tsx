
// components
import { ProductCardComponent } from "../cards/ProductCard";
import InfiniteScrollGrid from "../../components/common/InfiniteScrollGrid";

// types
import { type ProductDataType } from "../../types/productInterface/productInterface";
import { type ErrorObject } from "../../types/errorComponentInterface";

//Hooks
import { useState, useEffect }  from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export type getProductFunction<GetByType> = (getBy: GetByType, page?: number, limit?: number) => Promise<
 { products: ProductDataType[] } | { errorMsg: string;}>

interface ProductListProps<GetByType> {
    getProduct: getProductFunction<GetByType>;
    getBy: any;
    isLoading: boolean;
    errorObj: ErrorObject;
    handleError: (errorObj: ErrorObject) => void;
    setLoading: (isLoading: boolean) => void;
    
}

function ProductList<GetByType>({getProduct, getBy, isLoading, errorObj, handleError, setLoading}: ProductListProps<GetByType>) {

    const { page, hasMore, isFetching, loadMore, handleEnd, setFetching } = useInfiniteScroll();

    const [products, setProducts] = useState<ProductDataType[]>([]);

    const loadProducts = async (pageToLoad: number) => {
        if (!getBy) return;
        setFetching(true);
        try {
            const res = await getProduct(getBy, pageToLoad);

            let newProducts: ProductDataType[] = [];

            if (Array.isArray(res)) {
                newProducts = res;
            } else if (res && typeof res === 'object' && 'products' in res) {
                newProducts = (res as any).products;
            } else if ("errorMsg" in res) {
                handleError({ errorState: true, errorMsg: res.errorMsg });
            }

            if (newProducts.length === 0) {
                handleEnd();
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
            handleError({ errorState: true, errorMsg: "Failed to load products" });
        } finally {
            setLoading(false);
            setFetching(false);
        }
    }

    const handleRetry = () => {
        handleError({ errorState: false, errorMsg: "" });
        window.location.reload();
    }

    useEffect(() => {
        loadProducts(page)
    }, [page])

    return (
        <>
            <InfiniteScrollGrid
                data={products}
                loading={isLoading || isFetching}
                hasMore={hasMore}
                onLoadMore={() => loadMore() }
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
        </>
    )
}

export default ProductList