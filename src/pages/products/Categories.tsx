
// components
import Page , { PageBody } from "../../components/Page"

// hooks
import { usePage } from "../../hooks/usePage"

// services
import { fetchProductCategories } from "../../services/fetchProducts"

// react
import { useEffect } from "react"

function Categories() {
  const { isLoading, errorObj, handleError, setLoading } = usePage();
  
  const fetchCategories = async () => {
    setLoading(true);
    const categories = await fetchProductCategories();
    setLoading(false);
    if ("errorMsg" in categories) {
      handleError({errorState: true, errorMsg: categories.errorMsg});
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Page>
      <PageBody errorObj={errorObj} isLoading={isLoading} >
        <div>Categories</div>
      </PageBody>
    </Page>
  )
}

export default Categories