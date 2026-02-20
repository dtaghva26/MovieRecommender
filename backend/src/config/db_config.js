import mongoose from "mongoose"
import AppError from "./AppError.js"
const db_config = async () => {
    if(!process.env.MONGO_URI){
    throw new AppError(
      "MONGO_URI is not defined",
      500,
      "DB_CONFIG_ERROR"
    );
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected")
}
export default db_config;