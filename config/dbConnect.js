import mongoose from "mongoose";

export const connectDB = async () => {
    try{
    mongoose.set("strictQuery",false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection Successful");
    }catch(e){
        console.log(e.message);
        process.exit(1)
    }
} 