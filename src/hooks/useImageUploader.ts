// types
import type { ImageFileType, ImageUploaderHandlers } from '../types/filesInterface'

// react
import { useState } from 'react';

export const useImageUploader = (
    setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>,
    images: ImageFileType[])
    : { 
        updateImages: ImageUploaderHandlers, 
        appendImagesToFormData: (formData: Record<string, string | number>, imageFieldName: string) => FormData,
        imageToDelete: string[] 
    } => {

    // deleteImage
    const [imageToDelete, setImageToDelete] = useState<string[]>([]);

    // image uploader handlers
    const addImages = (images: ImageFileType[]): void => {
        setImages(prev => [...prev, ...images]);
    }

    const deleteImage = (index: number): void => {
        const imageFile = images[index];

        if (imageFile && !imageFile.file) {
            setImageToDelete(prev => [...prev, imageFile.preview]);
        }
        setImages(images.filter((_, i) => i !== index));
    }

    const resetImages = (): void => {
        setImages([]);
    }

    const appendImagesToFormData =(formData: Record<string, string | number>, imageFieldName: string = "images"): FormData => {
        const multiPartForm = new FormData();
        
        images.forEach((image) => {
            if (!image.file) return;
            multiPartForm.append(imageFieldName, image.file);
        });

        Object.entries(formData).forEach(([key, value]) => {
            multiPartForm.append(key, value.toString());
        });

        if (imageToDelete) {
            multiPartForm.append("imageToDelete", JSON.stringify(imageToDelete) )
        }

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
        appendImagesToFormData,
        imageToDelete
    };
}