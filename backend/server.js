import express from "express"
const app = express()
const PORT = 3000 // add process.env.port
app.use(express.json())
app.get("/", (req, res) => {
    res.send("hello world")
})
app.listen(PORT, () => {
    console.log("app listening")
})