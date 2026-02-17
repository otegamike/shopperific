
// components
import Page , { PageBody } from "../../components/Page"
import ProductCategories from "../../components/cards/CategoryCard"
// hooks
import { usePage } from "../../hooks/usePage"

// services
import { fetchProductCategories } from "../../services/fetchProducts"

// react
import { useEffect, useState } from "react"

// types
import type { ProductCategoriesDataType } from "../../types/productInterface/productInterface"

function Categories() {
  const { isLoading, errorObj, handleError, setLoading } = usePage();
  const [categories, setCategories] = useState<ProductCategoriesDataType[]>([]);
  const fetchCategories = async () => {
    setLoading(true);
    const categories = await fetchProductCategories();

    if (!categories || "errorMsg" in categories) {
      setLoading(false);
      handleError({errorState: true, errorMsg: "Categories not found"});
      return;
    }
    
    setCategories(categories);
    setLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Page>
      <PageBody errorObj={errorObj} isLoading={isLoading} >
        <h3>Categories</h3>
        <ProductCategories productsCategoryData={categories} loading={isLoading} />
      </PageBody>
    </Page>
  )
}

export default Categories