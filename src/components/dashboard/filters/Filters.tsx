import Button from "../../buttons/button"
import Search from "../../contents/search/Search"

// services
import { getShops } from "../../../services/shops"

// react 
import { useEffect } from "react"

import type { ShopListType } from "../../../types/shopsInterface"

interface FilterProps {
  shopList: ShopListType[];
  currentShop: string, 
  changeCurrentShop: (shop: string) => void;
  updateShopList: (shopList: ShopListType[]) => void;
}

function Filters({currentShop, changeCurrentShop, updateShopList, shopList}: FilterProps ) {

  const loadShops = async () => {
    const fetchShops = await getShops();
    if ( "errorMsg" in fetchShops) return;
    const shopList: ShopListType[] = fetchShops.shops.map((shop) => ({
      shop_id: shop._id,
      shopName: shop.shopName
    }));
    updateShopList(shopList);

  }

  useEffect(() => {
    loadShops();
  }, []);

  return (
    <>
    <div className="filter__container"><div className="filters">
        <Search />
        <div className="filter__btns">
          <Button type="tetirary" id="category" className="pill__btn" content="category" />
          <Button type="tetirary" id="status" className="pill__btn" content="status" />
          <ShopSelect shopList={shopList} currentShop={currentShop} changeCurrentShop={changeCurrentShop} />
        </div>
      </div></div>
    </>
  )
}

export default Filters

interface ShopSelectProps {
  shopList: ShopListType[];
  currentShop: string;
  changeCurrentShop: (shop: string) => void;
}

export const ShopSelect = ({shopList, currentShop, changeCurrentShop}: ShopSelectProps) => {
  
  return (
    <select id="shops" className="pill__btn button--tetirary" value={currentShop} onChange={(e) => changeCurrentShop(e.target.value)}>
      <option value="">All shops</option>
      {shopList && shopList.map((shop) => (
        <option key={shop.shopName} value={shop.shop_id}>{shop.shopName}</option>
      ))}
    </select>
  )
}