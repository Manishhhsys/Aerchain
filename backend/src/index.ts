import express from "express"
import cors from "cors"
import { config } from "dotenv"
import rfproute from "./routes/rfp.routes"
config({
    path:"../.env"
})
const app=express()
app.use(express.json())
app.use(cors())

app.use("/api/create-rfp",rfproute)

app.listen(process.env._PORT,()=>{
    console.log(`Server is Running on ${process.env._PORT}`)
})