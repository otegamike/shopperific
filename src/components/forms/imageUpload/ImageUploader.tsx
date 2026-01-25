//css
import './image-upload.css';

//Components
import PlusSvg from '../../../assets/svg/plus'

//Hooks and react
import { useState } from 'react'

//types
import type { ImageFileType, ImageUploaderHandlers } from '../../../types/filesInterface'

interface ImageUploaderProps {
    updateImage: ImageUploaderHandlers;
    maxImages?: number;
}

function ImageUploader({ updateImage, maxImages = 4 }: ImageUploaderProps) {

    const [images, setImages] = useState<ImageFileType[]>([])

    const ImageUpload: React.FC<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ onChange }) => {
        return (
            <div className='image'>
                <label htmlFor='imageUpload' className="add__image">
                    <PlusSvg size={60} fill='var(--grey-color-light)' />
                    upload image or drag and drop
                </label>

                <input className='hide' id='imageUpload' type="file" multiple={ maxImages > 1 } onChange={onChange} />
            </div>
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);

            // Filter duplicates
            const uniqueFiles = fileArray.filter(file =>
                !images.some(img => img.file.name === file.name && img.file.size === file.size)
            );

            // Limit to remaining slots
            const remainingSlots = maxImages - images.length;
            const filesToAdd = uniqueFiles.slice(0, remainingSlots);

            const newImages = filesToAdd.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));

            setImages(prev => [...prev, ...newImages]);
            updateImage.add(newImages);

            // Reset input value
            e.target.value = "";
        }
    }

    const deleteImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        updateImage.delete(index);
    }

    return (
        <div className='image__preview__container'>
            <div className="image__preview no-scrollbar" style={images.length > 1 ? { overflowX: "auto" } : { overflowX: "hidden" }}>
                {images.map((image, index) => (
                    <div className='image' key={index}>
                        <span className='del__btn' onClick={() => deleteImage(index)}>x</span>
                        <img src={image.preview} alt={`preview-${index}`} />
                    </div>
                ))}

                {images.length < maxImages && <ImageUpload onChange={handleImageChange} />}
            </div>
        </div>
    )
}

export default ImageUploader