
// react
import { useState, useEffect } from "react";

// hooks
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../services/fetchProducts";


// hooks
import { usePage } from "../../hooks/usePage";

// types
import type { ProductType } from "../../types/productInterface/productInterface";

// component 
import Page, { PageBody , PageNavigation, type navLinksProps } from "../../components/Page";
import ProductDetails from "../../components/product/ProductDetails";


function Product() {
    const { id } = useParams();
    const { isLoading, errorObj, handleError, setLoading } = usePage();

    const [product, setProduct] = useState<ProductType | null>(null);

    const loadProduct = async () => {
        setLoading(true);
        const res = await fetchProduct(id!);

        if (res && "errorMsg" in res) {
            setLoading(false);
            handleError({ errorState: true, errorMsg: res.errorMsg });
            return;
        }

        if (!res) {
            setLoading(false);
            handleError({ errorState: true, errorMsg: "Product not found" });
            return;
        }

        setProduct(res);
        setLoading(false);
    }

    useEffect(() => {
        loadProduct();
    }, []);


    const navigation: navLinksProps[] = [
        { label: "Categories", path: "/products/categories" }
    ]




    return (
        <Page>
            <PageNavigation navLinks={isLoading? navigation : [...navigation, { label: `${product?.category}`, path: `/products/category/${product?.category}` }]} currentPage={product?.name || ""} />
            <PageBody errorObj={errorObj} isLoading={isLoading} >
                {product && <ProductDetails product={product} />}
            </PageBody>
        </Page>
    )
}

export default Product