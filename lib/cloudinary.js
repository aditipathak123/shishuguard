import { v2 as cloudinary } from "cloudinary";

const hasCloudinaryConfig =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// upload helper
export const uploadImage = async (file) => {
  try {
    if (!hasCloudinaryConfig) {
      throw new Error("Cloudinary environment variables are missing");
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: "shishuguard",
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

export { cloudinary, hasCloudinaryConfig };
