// Components
import Page, { PageBody , PageNavigation, type navLinksProps} from "../../components/Page"
import ProductList from "../../components/product/ProductList";

// hooks
import { usePage } from "../../hooks/usePage"
import { useParams } from "react-router-dom";

// services
import { fetchProductsByCategory } from "../../services/fetchProducts";

function Category() {
    const { isLoading, errorObj, handleError, handleRetry, setLoading } = usePage(false);
    const { category } = useParams();

    const navigation: navLinksProps[] = [
        { label: "Categories", path: "/products/categories" }
    ]

    const currentPage = category;

    
    return (
        <Page style={{ padding: "1rem", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <PageNavigation navLinks={navigation} currentPage={currentPage || ""} />
            <PageBody errorObj={{...errorObj, retry: handleRetry}} isLoading={isLoading}>
                <ProductList<string> 
                    getProduct={fetchProductsByCategory}
                    getBy={category}
                    isLoading={isLoading}
                    errorObj={errorObj}
                    handleError={handleError}
                    setLoading={setLoading}
                />
            </PageBody>
        </Page>
    )
}

export default Category