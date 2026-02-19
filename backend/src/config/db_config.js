import mongoose from "mongoose"
export const db_config = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected!")

    }catch(error){
        console.error("unable to connect to database")
        process.exit(1)
    }
}