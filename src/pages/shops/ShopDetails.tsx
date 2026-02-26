// styles
import "./shop-details.css";

// components
import Page, { PageBody, PageNavigation } from "../../components/Page"
import Image from "../../components/images/Image";
import TextWithReadMore from "../../components/TextWithReadMore";
import ProductList from "../../components/product/ProductList";

// hooks
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePage } from "../../hooks/usePage";
import { useEffect } from "react";

// services
import { getShopByShopId } from "../../services/shops";
import { fetchProductsByShopId } from "../../services/fetchProducts";

// types
import type { ShopDataType } from "../../types/shopsInterface";
import type { GetByShopId } from "../../services/fetchProducts";

function ShopDetails() {
    const { shopId } = useParams();
    const [shopData, setShopData] = useState<ShopDataType | undefined>(undefined)

    // hooks
    const { isLoading, errorObj, handleError, setLoading } = usePage() ;

    const loadShop = async () => {
        if (!shopId) return;
        setLoading(true)

        const fetchShop = await getShopByShopId(shopId);

        if ("errorMsg" in fetchShop ) {
            handleError( { errorState: true, errorMsg:fetchShop.errorMsg })
            setLoading(false)
            return
        }
        setShopData(fetchShop.shop)
        setLoading(false)
    }

   
    const navLinks = [
        { path: "/shops", label: "Shops" }
    ]

    useEffect(() => {
        loadShop()
    }, [])

    useEffect(() => {
        console.log(shopData);
    }, [shopData])
    
  return (
    <Page>
        <PageNavigation navLinks={navLinks} currentPage={shopData?.shopName || ""} />
        <PageBody errorObj={errorObj} isLoading={isLoading}>
          {shopData && 
            <div className="shop__details__container">
              <div className="shop__details">
                <div className="shop__details__header">
                  <div className="shop__details__display_image">
                    <img className="shop__details__background__img" src={shopData.displayImageUrl} alt={`${shopData.shopName} background image`} />
                    <Image className="shop__details__logo" src={shopData.displayImageUrl} alt={`${shopData.shopName} display image`} />
                  </div>
                  <div className="shop__details__name">
                      <h2>{shopData.shopName}</h2>
                  </div>
                  <div className="shop__details__description">
                      <TextWithReadMore wordLimit={100}>{shopData.description}</TextWithReadMore>
                  </div>

                    
                  
                </div>

                <div className="shop__details__products">
                    <h3> Products</h3>
                    <ProductList<GetByShopId> 
                      getBy={{shopId: shopData.shopId}}
                      getProduct={fetchProductsByShopId}
                      isLoading={isLoading}
                      errorObj={errorObj}
                      handleError={handleError}
                      setLoading={setLoading}
                    />
                </div>
              </div>
            </div> 
          }
            
        </PageBody>
    </Page>
  )
}

export default ShopDetails