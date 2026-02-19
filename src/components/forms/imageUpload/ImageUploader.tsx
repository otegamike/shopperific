//css
import './image-upload.css';

//Components
import PlusSvg from '../../../assets/svg/plus'

//Hooks and react
import { useState } from 'react'

//types
import type { ImageFileType, ImageUploaderHandlers } from '../../../types/filesInterface'

interface ImageUploaderProps {
    images: ImageFileType[];
    updateImage: ImageUploaderHandlers;
    maxImages?: number;
    name?: string;
}

function ImageUploader({ images, updateImage, maxImages = 4, name = "images" }: ImageUploaderProps) {

  
    const ImageUpload: React.FC<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ onChange }) => {
        return (
            <div className='image'>
                <label htmlFor='imageUpload' className="add__image">
                    <PlusSvg size={60} fill='var(--grey-color-light)' />
                    upload image or drag and drop
                </label>

                <input className='hide' id='imageUpload' type="file" name={name} multiple={maxImages > 1} onChange={onChange} />
            </div>
        );
    };

    const [isDragging, setIsDragging] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let files: FileList | null = null;

        if ('dataTransfer' in e) {
            files = e.dataTransfer.files;
        } else {
            files = (e as React.ChangeEvent<HTMLInputElement>).target.files;
        }

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

            updateImage.add(newImages);

            // Reset input value if it's a change event
            if ('target' in e && 'value' in e.target) {
                (e.target as HTMLInputElement).value = "";
            }
        }
    }

    const deleteImage = (index: number) => {
        updateImage.delete(index);
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Only set dragging to false if we're leaving the container itself
        // or if we're moving outside the window (checking relatedTarget can be tricky with children)
        // A simple timeout or check might be robust, but for now simple false is standard start.
        // However, child elements trigger dragleave. 
        // We'll use the onDragLeave on the container.
        if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return;
        }
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'copy';
        }
        setIsDragging(true);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleImageChange(e);
    }

    return (
        <div
            className={`image__preview__container ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ position: 'relative' }} // ensure relative for absolute overlay
        >
            {isDragging && (
                <div className="drop-overlay">
                    Drop images here
                </div>
            )}
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