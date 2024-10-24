import mongoose from "mongoose";
import { config } from "dotenv";
config();

// to do - write explanation
export default async function connection() {
    const mongoURI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(mongoURI, {
            dbName: "booksdatabase",
        });
        console.log("Database is connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
