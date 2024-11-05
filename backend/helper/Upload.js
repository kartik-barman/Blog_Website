import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// Upload an image
export const uploadFile = async (filepath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filepath);
        console.log("File uploaded successfully:", uploadResult);  
        return uploadResult;
    } catch (error) {
        console.error("Cloudinary File Upload Error:", error);
    }
};
