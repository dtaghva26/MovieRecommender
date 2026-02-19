import express from "express"
import { db_config } from "./config/db_config.js"
import userRouter from "./routes/UserRoutes.js"
import adminRouter from "./routes/AdminRoutes.js"

const app = express()
const PORT = 3000 //TODO add process.env.port
await db_config() //
app.use(express.json())
app.use("/user", userRouter)
app.use("/admin", adminRouter)

app.listen(PORT, () => {
    console.log("app listening")
})