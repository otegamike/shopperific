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
  // Split by '/' and get the parts after 'upload/'
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  
  // Join the parts after the version number (e.g., 'v1234567')
  // and remove the file extension at the end
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
