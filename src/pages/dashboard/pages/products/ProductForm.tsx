//Hooks and react 
import { useForm } from '../../../../hooks/useForm';
import { useImageUploader } from '../../../../hooks/useImageUploader';
import { useRef, useState, useEffect } from 'react';
import { useFormContext } from '../../../../hooks/useFormContext';

//Services

//utils
// import { alertObj } from '../../../../utils/alerts/alert';
import { numberValidator, categoryValidator, shopValidator } from '../../../../utils/validateForms';
//motion
import { motion } from "framer-motion"

//Components
import Button from '../../../../components/buttons/button';
import FormGroup from '../../../../components/forms/FormGroup';
import ImageUploader from '../../../../components/forms/imageUpload/ImageUploader';
import LoaderSvg from '../../../../assets/svg/loader';
import { ShopSelect } from '../../../../components/dashboard/filters/Filters';

// Service
import { AddNewProduct } from '../../../../services/AddNewProduct'
import { editProduct } from '../../../../services/DashboardDataServices';

//types
import { type NewProductDataType, PRODUCT_CATEGORIES } from '../../../../types/productInterface/productInterface'
import type { ImageFileType } from '../../../../types/filesInterface'
import type { ShopListType } from '../../../../types/shopsInterface';
import type { DashboardProductsData } from '../../../../types/dashboardDataType';
import { alertObj } from '../../../../utils/alerts/alert';


interface ProductFormProps {
    reloadProductsData?: () => Promise<void>;
    shopList: ShopListType[];
    editMode?: boolean;
    productData?: DashboardProductsData;
}
function ProductForm({ reloadProductsData, shopList, editMode, productData }: ProductFormProps) {

    const { formData, handleChange, updateSpecificField, resetForm, isFormValid, validity, validate, validateAll } = useForm<NewProductDataType>({
        currentShop: productData?.shopRef || "",
        name: productData?.name ||  "",
        description: productData?.description || "",
        price: productData?.price || 0,
        category: productData?.category || "",
        subCategory: productData?.subCategory || "",
        stock: productData?.stock || 0
    }, [
        {key: "price", customvalidator: {asyncFunction: false, validatorFunction: numberValidator} },
        {key: "stock", customvalidator: {asyncFunction: false, validatorFunction: numberValidator} },
        {key: "category", customvalidator: {asyncFunction: false, validatorFunction: categoryValidator} },
        {key: "subCategory", customvalidator: {asyncFunction: false, validatorFunction: categoryValidator} },
        {key: "currentShop", customvalidator: {asyncFunction: false, validatorFunction: shopValidator} }
    ] )

    // states
    const [loading, setLoading] = useState(false);
    
    // image states
    const [images, setImages] = useState<ImageFileType[]>(productData?
        productData?.images.map((image) => ({
            file: null,
            preview: image
        })) : []);
    const [showImageError, setShowImageError] = useState(false);
    const { updateImages, appendImagesToFormData, imageIsValid } = useImageUploader(setImages, images);

    // refs
    const buttonRef = useRef<HTMLButtonElement>(null);
    const focusButton = () => {
        buttonRef.current?.focus();
    }

    const changeCurrentShop = (shop: string) => {
       updateSpecificField("currentShop", shop)
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        focusButton();

        // validate form
        await validateAll();
        if (!isFormValid || !imageIsValid) {
            setShowImageError(true);
            setLoading(false);
            alertObj("Some forms are invalid or empty", "error");
            return;
        }
        
        setLoading(true);

        // append images to form data
        const multiPartFormData = appendImagesToFormData(formData, "images");

        if (!editMode) {
            await AddNewProduct(multiPartFormData);
            resetForm();
            setImages([]);
        } else if (editMode && productData) {
            await editProduct(productData?._id, multiPartFormData);
        }

        setLoading(false);

        if (reloadProductsData) reloadProductsData();

    }

    useEffect(() => {
        console.log('form data', formData)
        console.log('validity', validity)
    }, [formData])

    return (
        <motion.div className={`add__product ${editMode ? "edit__mode" : ""}`} 
            initial={{ opacity: 0, y: -20 , height: "0px"}} 
            animate={{ opacity: 1, y: 0 , height: "auto"}} 
            exit={{ opacity: 0, y: -20 , height: "0px"}} 
            transition={{ duration: 0.5 }}>
                
            <div className='dashboard__subheading' style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                <h5>Add New Product</h5>
                <FormGroup variant='borderless' type='children' formValue={formData.currentShop} name="currentShop" validate={validate}>
                    <ShopSelect shopList={shopList} id="form__shoplist" currentShop={formData.currentShop} changeCurrentShop={changeCurrentShop} />
                </FormGroup>
            </div>
            {/* image uploader */}
            <ImageUploader images={images} updateImage={updateImages} maxImages={4} imageIsValid={imageIsValid} showImageError={showImageError} />

            <form onSubmit={handleSubmit}>

                {/* Form Fields */}
                <FormGroup<NewProductDataType> name='name' label='Product Name' type='text' variant='borderless' id='productName' onChange={handleChange} formValue={formData.name} validate={validate} />
                <FormGroup<NewProductDataType> name='description' label='Description' type='textarea' variant='borderless' id='description' onChange={handleChange} formValue={formData.description} validate={validate} />

                <div className="price__stock">
                    <FormGroup<NewProductDataType> name='price' label='Price' type='number' variant='borderless' id='price' onChange={handleChange} formValue={formData.price === 0 ? "" : formData.price} validate={validate} />
                    <FormGroup<NewProductDataType> name='stock' label='Stock' type='number' variant='borderless' id='stock' onChange={handleChange} formValue={formData.stock === 0 ? "" : formData.stock} validate={validate} />
                </div>

                <FormGroup type="children" variant='borderless' formValue={formData.category} name="category" validate={validate}>
                    <CategorySelector value={formData.category} onChange={(e) => handleChange(e)} />
                </FormGroup>
                <FormGroup<NewProductDataType> name='subCategory' label='Product Sub Category' type='text' className='form__select_container' variant='borderless' id='subCategory' onChange={handleChange} formValue={formData.subCategory} validate={validate} />
                <Button type='main' className='tall full__btn center__content' state={loading ? "disabled" : "default"}  content={loading ? <LoaderSvg size={20} /> : `${editMode?"Update" : "Add"} Product`} />

            </form>
        </motion.div>
    )
}

export default ProductForm

const CategorySelector: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}> = ({ value, onChange }) => {
    const { handleBlur, handleFocus} = useFormContext();

        const onBlur = async() => {
           await handleBlur()

        }

        return (
            <div className='form__select_container'>
                <select className='form__select tall borderless__input full__btn' value={value} onChange={onChange} name="category" onFocus={handleFocus} onBlur={onBlur}>
                    <option value="" disabled>Select a category</option>
                    {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat.toLowerCase().replace(/ /g, '-')}>
                            {cat}
                        </option>
                    ))}
                </select></div>
        );
    };