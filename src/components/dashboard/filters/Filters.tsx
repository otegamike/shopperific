import "./filters.css"

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
          <Button type="tetirary" id="category" className="pill__btn filter__btn" content="category" />
          <Button type="tetirary" id="status" className="pill__btn filter__btn" content="status" />
          <ShopSelect style={{ maxWidth: "9rem" }} shopList={shopList} currentShop={currentShop} changeCurrentShop={changeCurrentShop} />
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
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}

export const ShopSelect = ({shopList, currentShop, changeCurrentShop, style, className, id}: ShopSelectProps) => {
  
  return (
    <select 
      id={id || "shops"}
      className={`${className?className:""} filter__btn pill__btn button--tetirary`}
      style={{ transition: "all 0.3s ease-in-out" , ...style}}
      value={currentShop}
      onChange={(e) => changeCurrentShop(e.target.value)}
    >
      <option value="">All shops</option>
      {shopList && shopList.map((shop) => (
        <option key={shop.shopName} value={shop.shop_id}>{shop.shopName}</option>
      ))}
    </select>
  )
}