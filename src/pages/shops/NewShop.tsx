import Header from '../../components/header/Header'
import FormGroup from '../../components/forms/FormGroup'
import { useForm } from '../../hooks/useForm'
import { validateShopId } from '../../services/createShop';
import Button from '../../components/buttons/button';
import shop from "../../assets/shoppers/create-shop-shop.png"
import girl from "../../assets/shoppers/create-shop-girl.png"

function NewShop() {


  const { formData, handleChange, handleValidation, isFormValid } = useForm({
    shopName: "",
    shopId: "",
    shopLink: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <Header navbar={true}/>
      <main className='background__ilustration'>
        <div className="auth__card">
        <section className='card' style={{marginTop: "2rem"}}>
          <div className='shops__header'>
            <h3>Create New Shop</h3>
          </div>

          <form onSubmit={handleSubmit}>
            
            <FormGroup name='shopName' label='Shop Name' variant='borderless' type='text' id='shopName' formValue={formData.shopName} onChange={handleChange} validate={true} validateFunction={handleValidation}  />
            <FormGroup name='shopId' label='Shop ID' variant='borderless' type='text' id='shopId' formValue={formData.shopId} onChange={handleChange} validate={true} validateFunction={handleValidation} customValidator={{asyncFunction: true, validatorFunction: validateShopId}} />
            <FormGroup name='shopLink' label='Shop Link' variant='borderless' type='text' id='shopLink' value={(formData.shopId)?`shopperific.netlify.app/shop/${formData.shopId}`:""} disabled={true}/>
            <FormGroup name='description' label='Write a short note about your new shop...' variant='borderless' type='textarea' id='description' formValue={formData.description} onChange={handleChange} validate={true} validateFunction={handleValidation} />
            <Button className='pill__btn tall full__btn createShop__btn' content="Create Shop" />
          </form>
          
        </section>
        </div>

        <img className="background__img ilustration-left girl" src={girl} alt="shoppeer-left" />
        <img className="background__img ilustration-right" src={shop} alt="shoppeer-right" />
      </main>
    </>
  )
}

export default NewShop