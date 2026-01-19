import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL environment variable is not defined");
        }
        await mongoose.connect(mongoUrl);
        console.log("Database Connection Successful");
    } catch (e: any) {
        console.log(e.message);
        process.exit(1);
    }
}
