import "dotenv/config"
import express from "express"
import db_config from "./config/db_config.js"
import userRouter from "./routes/UserRoutes.js"
import adminRouter from "./routes/AdminRoutes.js"
import cors from "cors"
import errorHandler from "./middlewares/error_handler.js"
const app = express()
const PORT = process.env.PORT
await db_config() //connect to mongodb
app.use(cors()) //needed for connecting to frontend
app.use(cors()) //needed for connecting to frontend
app.use(express.json())//handling json response
app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use(errorHandler) //handling errors
app.listen(PORT, () => {
    console.log("app listening")
})