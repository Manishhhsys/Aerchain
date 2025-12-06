import { Request,Response } from "express"
import { StatusCode } from "../schema/statuscode.enum"
import { rfpTextSchema } from "../schema/rfpText.Schema"
import { getrfpparaseddata } from "../services/aiservices/createRfp/createRfp.services"
import prisma from "../utils/prisma.client"
export const createRfp=async(req:Request,res:Response)=>{
    try{
        const paraseddata=rfpTextSchema.safeParse(req.body)
        if(!paraseddata.success){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:paraseddata.error.message
            })
        }
        const raw_text=paraseddata.data.raw_text
        const structured_text=await getrfpparaseddata(raw_text)
        if(!structured_text){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"Something Went Wrong"
            })
        }
        const response=await prisma.rfps.create({
            data:{
                name:paraseddata.data.name,
                raw_text:raw_text,
                structured_requirements:structured_text
            }
        })
        return res.status(StatusCode.CREATED).json({
            message:"New RFP Proposal is Created Successfully",
            data:response.id
        })
    }catch(e:any){
        console.log("Internal Erorr while Filtering the RFP",e)
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal error While Creating the RFP"
        })
    }
}