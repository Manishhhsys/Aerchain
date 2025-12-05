import { Request,Response } from "express";
import { StatusCode } from "../schema/statuscode.enum";
import { rfpIdSchmea } from "../schema/rfpIdSchema";
import prisma from "../utils/prisma.client";
import { StatusNum } from "@prisma/client";


export const comparevendor=async(req:Request,res:Response)=>{
    try{
        const rfp_id=req.params.rfp_id
        if(!rfp_id){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"The Rfp Id Is Missing"
            })
        }
        const isvalidrfpid=await prisma.sent_rfps.findMany({
            where:{
                rfp_id:rfp_id,
                status:StatusNum.RESPONDED
            }
        })
        if(isvalidrfpid.length===0){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"The Rfp Id doesnt Exists Or  No vendor have Responded"
            })
        }
        const proposals=await prisma.proposals.findMany({
            where:{
                rfp_id:rfp_id
            },include:{
                vendor:true
            }
        })
        const finaldata=proposals.filter(p=>
            isvalidrfpid.some((r)=>r.vendor_id==p.vendor_id)
        )
        console.log(finaldata)
    }catch(e:any){
        console.log("Internal Error while Comapring The vendor Response",e)
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Erorr While Comparing the vendor Resposne"
        })
    }
}   