import Header from '../components/header/Header'
import Section from '../components/contents/sections/Section'
import { homeService } from '../services/homeServices'
import { useState, useEffect } from 'react'

function Home() {

  const [isLoading, setIsLoading ] = useState<boolean>(false);
  const [homeData, setHomeData] = useState<any>(null);

   const loadHomeData = async () => {
      setIsLoading(true)
      const res = await homeService();
      if ("errorMsg" in res) {
        console.error(res.errorMsg);
      } else {
        console.log("home data", res);
        setHomeData(res);
      }
      setIsLoading(false)
    }

  useEffect(() => {
    loadHomeData();
  }, [])

  return (
    <div className='page'>
      <Header navbar={true} />
      <main>
        <div className='sections'>
            <Section isLoading={isLoading} products={homeData?.bestSellers} title="Best Sellers" />
            <Section isLoading={isLoading} products={homeData?.recentlyAdded} title="Recently Added" />
            <Section isLoading={isLoading} products={homeData?.bestDeals} title="Best Deals" />
        </div>
      </main>         
    </div>
  )
}

export default Home