import express from "express"
import cors from "cors"
import { config } from "dotenv"
import rfproute from "./routes/rfp.routes"
import { StatusCode } from "./schema/statuscode.enum"
import { Response ,Request} from "express"
config()
const app=express()
app.use(express.json())
app.use(cors())

app.use("/api/rfp",rfproute)
app.get("/health",(req:Request,res:Response)=>{
    return res.status(StatusCode.OK).json({
        message:"Server is Running",
        uptime:process.uptime()
    })
})
app.listen(process.env._PORT,()=>{
    console.log(`Server is Running on ${process.env._PORT}`)
})