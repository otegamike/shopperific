
// import Header from '../../components/header/Header'
// import ShopCard from '../../components/cards/ShopCard'
import Button from '../../components/buttons/button'
import { Link } from 'react-router-dom'


import Page, { PageBody } from '../../components/Page'

function Shops() {
  return (
    <>
    <Page>
      <div className='shops__header'><h3>Shops</h3> <Link to="/new-shop"><Button type="secondary" className="pill__btn" id="panel-button" content="New Shop" /></Link></div>
      <PageBody errorObj={{ errorState: false, errorMsg: "" }} isLoading={false}>
        
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