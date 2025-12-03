import { Request,Response } from "express";
import { StatusCode } from "../schema/statuscode.enum";
import prisma from "../utils/prisma.client";

export const getvendorlist=async(req:Request,res:Response)=>{
    try{
        const response=await prisma.vendors.findMany()
        if(response.length===0){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"Error While Fetching The Vendor List"
            })
        }
        return res.status(StatusCode.OK).json({
            message:"Success",
            data:response
        })
    }catch(e:any){
        console.log("Internal Error While Fetching the Vendor List",e)
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Error While Fetching the Vendor List"
        })
    }
}