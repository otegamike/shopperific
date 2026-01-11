import Header from '../../components/header/Header'
import FormGroup from '../../components/forms/FormGroup'

function NewShop() {
  return (
    <>
      <Header navbar={true}/>
      <main className='center__content'>
        <section className='section'>
          <div className='shops__header'>
            <h3>Create New Shop</h3>
          </div>

          <form>
            
            <FormGroup name='shopName' label='Shop Name' variant='borderless' type='text' id='shopName' />
            <FormGroup name='shopId' label='Shop ID' variant='borderless' type='text' id='shopId' />
            <FormGroup name='shopLink' label='Shop Link' variant='borderless' type='text' id='shopLink' />
            <FormGroup name='description' label='Description' variant='borderless' type='textarea' id='description' />
            
          </form>
          
        </section>
      </main>
    </>
  )
}

export default NewShop