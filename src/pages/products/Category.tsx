// Components
import Page, { PageBody , PageNavigation, type navLinksProps} from "../../components/Page"
import InfiniteScrollGrid from "../../components/common/InfiniteScrollGrid";
import ProductCardComponent from "../../components/cards/ProductCard";

// hooks
import { usePage } from "../../hooks/usePage"
import { useParams } from "react-router-dom";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

// types
import type { ProductDataType } from "../../types/productInterface/productInterface";

// services
import { fetchProductsByCategory } from "../../services/fetchProducts";

// react
import { useState, useEffect } from "react";

function Category() {
    const { isLoading, errorObj, handleError, setLoading } = usePage();
    const { page, hasMore, isFetching, loadMore, handleEnd, setFetching } = useInfiniteScroll();
    const { category } = useParams();

    if (!category) return (<Page><PageBody errorObj={{errorState: false, errorMsg: "Category not found"}} isLoading={false}> category not found </PageBody></Page>);

    const [products, setProducts] = useState<ProductDataType[]>([]);

    const loadProducts = async (pageToLoad: number) => {
        if (!category) return;
        setFetching(true);
        try {
            const res = await fetchProductsByCategory(category, pageToLoad);

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



    const navigation: navLinksProps[] = [
        { label: "Categories", path: "/products/categories" }
    ]

    const currentPage = category;

    useEffect(() => {
        loadProducts(page)
    }, [page])
    
    return (
        <Page style={{ padding: "1rem", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <PageNavigation navLinks={navigation} currentPage={currentPage} />
            <PageBody errorObj={{...errorObj, retry: handleRetry}} isLoading={isLoading}>
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
            </PageBody>
        </Page>
    )
}

export default Category