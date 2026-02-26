import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadBuffer = (
  buffer: Buffer,
  folder = "products"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error: any, result: any) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const getPublicIdFromUrl = (url: string): string => {
  
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  
  const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');
  return publicIdWithExtension.split('.')[0]; 
};

export const deleteImageByUrl = async (url: string) => {
  try {
    const publicId = getPublicIdFromUrl(url);
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log(`Image ${url} deleted successfully`);
    } else {
      console.log(`Image ${url} not found or already deleted`);
    }
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
  }
};



/**
 * Deletes multiple resources from Cloudinary by their Public IDs.
 * @param publicIds - Array of strings (the public_id of the images)
 * @returns Object indicating success or partial failure
 */
export const deleteMultipleImages = async (urls: string[]) => {

  const publicIds = urls.map((url: string) => getPublicIdFromUrl(url));

    if (!publicIds || publicIds.length === 0) {
        return { success: true, message: "No IDs provided" };
    }

    try {
        const result = await cloudinary.api.delete_resources(publicIds, {
            resource_type: 'image', 
            type: 'upload',         
            invalidate: true        
        });
        console.log("Cloudinary Bulk Delete Result:", result.deleted);
        
        return { 
            success: true, 
            deletedCount: Object.keys(result.deleted).length 
        };

    } catch (error: any) {
        console.error("Cloudinary Bulk Delete Error:", error.message);
        return { 
            success: false, 
            errorMsg: error.message || "Failed to delete images from Cloudinary" 
        };
    }
};
