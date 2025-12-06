import { Request,Response } from "express";
import { StatusCode } from "../schema/statuscode.enum";
import prisma from "../utils/prisma.client";

export const getrfplist=async(req:Request,res:Response)=>{
    try{
        const response=await prisma.rfps.findMany({
            select:{
                id:true,
                raw_text:true,
                name:true
            }
        })
        if(response.length==0){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"No Rfp Proposal Has Been Created"
            })
        }
        return res.status(StatusCode.OK).json({
            message:"Success",
            data:response
        })
    }catch(e:any){
        console.log("Internal Error While Fetching the Rpf List",e)
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Error While Fetching The RFP list"
        })
    }
}