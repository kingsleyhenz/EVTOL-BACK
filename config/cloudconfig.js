import {v2 as cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import dotenv from "dotenv"


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "gif", "jpeg"],
    params:{
        folder:"EVTOL MEDICATIONS",
        transformation:[{width: 200, height: 250, crop: "limit"}]
    }
})

export default storage