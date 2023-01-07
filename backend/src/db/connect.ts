import * as mongoose from "mongoose";
import {options} from "./config";

export const connectToDatabase = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE_URI, options);
        console.log("Connected to database");
    }
    catch (err) {
        console.log("HttpError connecting to database", err);
    }
}