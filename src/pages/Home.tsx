import Header from '../components/header/Header'
import Section from '../components/contents/sections/Section'

function Home() {
  return (
    <div className='main-page'>
      <Header navbar={true} />
      <main>
        <div className='sections'>
            <Section title="Best Sellers" />
            <Section title="New Arrivals" />
            <Section title="Just Added Products" />
            <Section title="Best Deals" />  
        </div>
      </main>         
    </div>
  )
}

export default Home