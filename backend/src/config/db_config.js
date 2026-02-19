import mongoose from "mongoose"
export const db_config = async () => {
    try{
        const connection = await mongoose.connect(process.env.Mongo)
        console.log("mongoose connected!")

    }catch(error){
        console.log("unable to connect to mongoose")
    }
}