
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
import Page from "../../components/Page";
import ProductDetails, { ProductHeading } from "../../components/product/ProductDetails";

// utils
// import { getCachedData } from "../../utils/cacheData";


function Product() {
    const { id } = useParams();
    const { isLoading, errorObj, handleError, setLoading } = usePage();

    const [product, setProduct] = useState<ProductType | null>(null);

    const loadProduct = async () => {
        setLoading(true);
        const res = await fetchProduct(id!);

        if ("errorMsg" in res) {
            setLoading(false);
            handleError({ errorState: true, errorMsg: res.errorMsg });
            return;
        }

        setProduct(res);
        setLoading(false);
    }

    useEffect(() => {
        loadProduct();
        // setLoading(false);
        // const { productsData } = getCachedData(`dashboardDataCache`);
        // console.log("productCache", productsData);
        // if (productsData) {
        //     setProduct(productsData[4]);
        // }
    }, []);




    const handleRetry = () => {
        setLoading(true);
        loadProduct();
    }

    return (
        <Page title="Product" pageHeading={<ProductHeading productName={product?.name || ""} />} errorObj={{ ...errorObj, retry: handleRetry }} isLoading={isLoading} >
            {product && <ProductDetails product={product} />}
        </Page>
    )
}

export default Product