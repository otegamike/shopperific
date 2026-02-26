
// react router
import { Link } from 'react-router-dom'

// hooks
import { useEffect, useState } from 'react'
import { usePage } from '../../hooks/usePage'

// services
import { getShops } from '../../services/shops'

// components
import Button from '../../components/buttons/button'
import ShopsList from '../../components/cards/ShopsListCard'

// types
import type { ShopDataType } from '../../types/shopsInterface'

import Page, { PageBody } from '../../components/Page'

function Shops() {
  const { isLoading, errorObj, handleError, setLoading } = usePage()
  const [shopData, setShopData] = useState<ShopDataType[]>([])

  const loadShops = async () => {
    setLoading(true)
    const fetchShops = await getShops()
    if ("errorMsg" in fetchShops) {
      handleError( { errorState: true, errorMsg:fetchShops.errorMsg})
      setLoading(false)
      return
    }
    setLoading(false)
    setShopData(fetchShops.shops)
  }

  useEffect(() => {
    loadShops()
    console.log("shopData: " ,shopData)
  }, [])

  return (
    <>
    <Page>
      <div className='shops__header'><h3>Shops</h3> <Link to="/new-shop"><Button type="secondary" className="pill__btn" id="panel-button" content="New Shop" /></Link></div>
      <PageBody errorObj={errorObj} isLoading={isLoading}>
        {shopData?.length > 0 && <ShopsList shopsData={shopData} loading={isLoading} />}
      </PageBody>
    
    </Page>


      {/* <Header navbar={true}/>
      <main className='center__content'>
        <section className='section'>

            <div className='shops__header'><h3>Shops</h3> <Link to="/new-shop"><Button type="secondary" className="pill__btn" id="panel-button" content="New Shop" /></Link></div>
            <div className='shops'>    
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
                <ShopCard/>
            </div>
        </section>
        
      </main> */}
    </>
  )
}

export default Shops