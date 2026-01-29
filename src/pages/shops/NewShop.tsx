//Hooks and react 
import FormGroup from '../../components/forms/FormGroup'
import { useForm } from '../../hooks/useForm'
import { useImageUploader } from '../../hooks/useImageUploader'
import { useState } from 'react';

//Services
import { type createShopType, validateShopId, createShop } from '../../services/createShop';

//utils
// import { useNavigate } from 'react-router-dom';
// import { alertObj } from '../../utils/alerts/alert';

//Components
import Header from '../../components/header/Header'
import Button from '../../components/buttons/button';
import ImageUploader from '../../components/forms/imageUpload/ImageUploader';

//Assets
import shop from "../../assets/shoppers/create-shop-shop.png"
import girl from "../../assets/shoppers/create-shop-girl.png"
import LoaderSvg from '../../assets/svg/loader';

//types
import type { ImageFileType } from '../../types/filesInterface';

function NewShop() {

  const { formData, validate, validateAll, isFormValid, loadHandler, handleChange } = useForm<createShopType>({
    shopName: "",
    shopId: "",
    description: ""
  }, [
    {
      key: "shopId",
      customvalidator: {
        asyncFunction: true,
        validatorFunction: validateShopId
      }
    }
  ]);


  const [shopLogo, setShopLogo] = useState<ImageFileType[]>([]);
  const { loading, buttonState, handleLoading } = loadHandler;

  const updateImage = useImageUploader(setShopLogo, shopLogo);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLoading("loading");

    await validateAll();
    if (!isFormValid) return handleLoading("idle", "disable");
    
    await createShop(formData);
    
    handleLoading("idle");
  }

  return (
    <>
      <Header navbar={true} />
      <main className='background__ilustration'>
        <div className="auth__card">
          <section className='card' style={{ marginTop: "2rem" }}>
            <div className='shops__header'>
              <h3>Create New Shop</h3>
            </div>

            <ImageUploader updateImage={updateImage} maxImages={1} />

            <form onSubmit={handleSubmit}>

              <FormGroup name='shopName' label='Shop Name' variant='borderless' type='text' id='shopName' formValue={formData.shopName} onChange={handleChange} validate={validate} />
              <FormGroup name='shopId' label='Shop ID' variant='borderless' type='text' id='shopId' formValue={formData.shopId} onChange={handleChange} validate={validate} />
              <FormGroup name='shopLink' label='Shop Link' variant='borderless' type='text' id='shopLink' value={(formData.shopId) ? `shopperific.netlify.app/shop/${formData.shopId}` : ""} disabled={true} />
              <FormGroup name='description' label='Write a short note about your new shop...' variant='borderless' type='textarea' id='description' formValue={formData.description} onChange={handleChange} validate={validate} />
              <Button className='pill__btn tall full__btn createShop__btn center__content' state={buttonState} content={loading ? <LoaderSvg /> : "Create Shop"} />
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