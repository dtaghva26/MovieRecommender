import mongoose from "mongoose"
export const db_config = async () => {
    try{
        const connection_url = "mongodb://localhost:27017/MovieRanking"
        const connection = await mongoose.connect(connection_url)
        console.log("mongoose connected!")

    }catch(error){
        console.log("unable to connect to mongoose")
    }
}