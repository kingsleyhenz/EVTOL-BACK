import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_API_SECRET!
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "EVTOL MEDICATIONS",
        allowed_formats: ["jpg", "png", "gif", "jpeg"],
        transformation: [{ width: 100, height: 100, crop: "limit" }]
    } as any
});

export default storage;
