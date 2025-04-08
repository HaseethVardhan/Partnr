import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
 
const cloudinaryUpload = async (localFilePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dbzcsfi3e",
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error)
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { cloudinaryUpload };
