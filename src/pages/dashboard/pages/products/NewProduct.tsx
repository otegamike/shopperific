//Hooks and react 
import { useForm } from '../../../../hooks/useForm';
import { useImageUploader } from '../../../../hooks/useImageUploader';
import { useRef, useState, useEffect } from 'react';

//Services

//utils
// import { alertObj } from '../../../../utils/alerts/alert';

//Components
import Button from '../../../../components/buttons/button';
import FormGroup from '../../../../components/forms/FormGroup';
import ImageUploader from '../../../../components/forms/imageUpload/ImageUploader';
import LoaderSvg from '../../../../assets/svg/loader';
// import PlusSvg from '../../../../assets/svg/plus';

// Service
import { AddNewProduct } from '../../../../services/AddNewProduct'

//types
import { type NewProductDataType, PRODUCT_CATEGORIES } from '../../../../types/productInterface/productInterface'
import type { ImageFileType } from '../../../../types/filesInterface'

function NewProduct() {

    const { formData, handleChange, resetForm } = useForm<NewProductDataType>({
        name: "",
        description: "",
        price: 0,
        category: "",
        subCategory: "",
        stock: 0
    })

    // states
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<ImageFileType[]>([]);

    const updateImage = useImageUploader(setImages, images);

    // refs
    const buttonRef = useRef<HTMLButtonElement>(null);
    const focusButton = () => {
        buttonRef.current?.focus();
    }

    const CategorySelector: React.FC<{
        value: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    }> = ({ value, onChange }) => {
        return (
            <div className='form__select_container'>
                <select className='form__select tall borderless__input full__btn' value={value} onChange={onChange} name="category">
                    <option value="" disabled>Select a category</option>
                    {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat.toLowerCase().replace(/ /g, '-')}>
                            {cat}
                        </option>
                    ))}
                </select></div>
        );
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        focusButton();
        setLoading(true);

        const multiPartFormData: FormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            multiPartFormData.append(key, value);
        });
        images.forEach((image) => {
            multiPartFormData.append('images', image.file);
        });


        await AddNewProduct(multiPartFormData);
        setLoading(false);
        resetForm();
        setImages([]);
    }

    return (
        <div className='add__product'>
            <div className='dashboard__subheading'>
                <h5>Add New Product</h5>
            </div>
            {/* image uploader */}
            <ImageUploader images={images} updateImage={updateImage} maxImages={4} />

            <form onSubmit={handleSubmit}>

                {/* Form Fields */}
                <FormGroup name='name' label='Product Name' type='text' variant='borderless' id='productName' onChange={handleChange} value={formData.name} />
                <FormGroup name='description' label='Description' type='textarea' variant='borderless' id='description' onChange={handleChange} value={formData.description} />

                <div className="price__stock">
                    <FormGroup name='price' label='Price' type='number' variant='borderless' id='price' onChange={handleChange} value={formData.price === 0 ? "" : formData.price} />
                    <FormGroup name='stock' label='Stock' type='number' variant='borderless' id='stock' onChange={handleChange} value={formData.stock === 0 ? "" : formData.stock} />
                </div>

                <CategorySelector value={formData.category} onChange={(e) => handleChange(e)} />
                <FormGroup name='subCategory' label='Product Sub Category' type='text' className='form__select_container' variant='borderless' id='subCategory' onChange={handleChange} value={formData.subCategory} />
                <Button type='main' className='full__btn center__content' content={loading ? <LoaderSvg size={20} /> : "Add Product"} />

            </form>
        </div>
    )
}

export default NewProduct