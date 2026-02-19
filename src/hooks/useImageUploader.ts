// types
import type { ImageFileType, ImageUploaderHandlers } from '../types/filesInterface'

export const useImageUploader = (
    setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>,
    images: ImageFileType[])
    : { updateImages: ImageUploaderHandlers, appendImagesToFormData: (formData: Record<string, string | number>, imageFieldName: string) => FormData } => {

    // image uploader handlers
    const addImages = (images: ImageFileType[]): void => {
        setImages(prev => [...prev, ...images]);
    }

    const deleteImage = (index: number): void => {
        setImages(images.filter((_, i) => i !== index));
    }

    const resetImages = (): void => {
        setImages([]);
    }

    const appendImagesToFormData =(formData: Record<string, string | number>, imageFieldName: string = "images"): FormData => {
        const multiPartForm = new FormData();
        
        images.forEach((image) => {
            multiPartForm.append(imageFieldName, image.file);
        });

        Object.entries(formData).forEach(([key, value]) => {
            multiPartForm.append(key, value.toString());
        });

        return multiPartForm;

    }

    const updateImages = {
        add: addImages,
        delete: deleteImage,
        reset: resetImages,
        appendImagesToFormData
    }

    return {
        updateImages,
        appendImagesToFormData
    };
}