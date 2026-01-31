// types
import type { ImageFileType, ImageUploaderHandlers } from '../types/filesInterface'

export const useImageUploader = (
    setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>,
    images: ImageFileType[])
    : ImageUploaderHandlers => {

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

    const updateImages = {
        add: addImages,
        delete: deleteImage,
        reset: resetImages
    }

    return updateImages;
}