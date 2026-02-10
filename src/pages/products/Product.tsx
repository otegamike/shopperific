
// react
import { useState, useEffect } from "react";

// hooks
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../services/fetchProducts";
import { useNavigate } from "react-router-dom";

// hooks
import { usePage } from "../../hooks/usePage";

// types
import type { ProductType } from "../../types/productInterface/productInterface";

// component 
import Page from "../../components/Page";

// svg
import BackButton from "../../assets/svg/backButton";

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
    }, []);

    const handleRetry = () => {
        setLoading(true);
        loadProduct();
    }

    return (
        <Page title="Product" pageHeading={<PageHeading productName={product?.name || ""} />} errorObj={{...errorObj, retry: handleRetry }} isLoading={isLoading} >
            <img src={product?.images?product?.images[0]:""} alt="" />
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
            <p>{product?.stock}</p>
            <p>{product?.category}</p>
            <p>{product?.shopName}</p>
            <p>{product?.createdAt}</p>
            <p>{product?.updatedAt}</p>
        </Page>
    )
}

export default Product

const PageHeading = ({productName}: {productName: string}) => {
    const navigate = useNavigate();
    const goToPreviousPage = () => {
        navigate(-1);
    }
    return (
        <>
            <h4 style={{ cursor: "pointer"}} onClick={() => goToPreviousPage()}>{<BackButton size={20} fill="var(--text-primary)" />} Products / {productName}</h4>
        </>
    )
}