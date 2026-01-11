
import Header from '../../components/header/Header'
import ShopCard from '../../components/cards/ShopCard'
import Button from '../../components/buttons/button'


function Shops() {
  return (
    <>
      <Header navbar={true}/>
      <main className='center__content'>
        <section className='section'>

            <div className='shops__header'><h3>Shops</h3> <Button type="secondary" className="pill__btn" id="panel-button" content="New Shop" /></div>
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
        
      </main>
    </>
  )
}

export default Shops