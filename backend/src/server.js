import dotenv from "dotenv"
dotenv.config() //config .env before calling db_config
import express from "express"
import { db_config } from "./config/db_config.js"
import userRouter from "./routes/UserRoutes.js"
import adminRouter from "./routes/AdminRoutes.js"
import cors from "cors"

const app = express()
const PORT = process.env.PORT
await db_config() //
app.use(cors())
app.use(express.json())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)

// handling unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "route not found",
    })
})
app.listen(PORT, () => {
    console.log("app listening")
})