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
