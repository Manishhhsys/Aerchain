import { Request,Response } from "express";
import { StatusCode } from "../schema/statuscode.enum";
import { rfpIdSchmea } from "../schema/rfpIdSchema";
import prisma from "../utils/prisma.client";
import { createUnimailTemplate } from "../services/aiservices/createAiMail/aimail.services";
import { sendmail } from "../services/mailservices/sendmail.services";
import { rfpllmSchema } from "../schema/rfpllmSchema";

export const sendrfpmail=async (req:Request,res:Response)=>{
    try{
        const rfpid=req.params.rfp_id
        const paraseddata=rfpIdSchmea.safeParse(req.body)
        if(!paraseddata.success){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:paraseddata.error.flatten()
            })
        }
        const isrfppresent=await prisma.rfps.findUnique({
            where:{
                id:rfpid
            }
        })
        if(!isrfppresent){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"The Given Proposal doesnt exists"
            })
        }
        const isalreadysent=await prisma.sent_rfps.findMany({
            where:{
                rfp_id:isrfppresent.id
            }
        })
        const alreadySendVendorIds=isalreadysent.map((s)=>s.vendor_id)
        const updatevendors=paraseddata.data.vendors_ids.filter((vendorId)=>!alreadySendVendorIds.includes(vendorId))
        if(updatevendors.length===0){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"The Proposal As been Already Sent to The Given Vendor list.Please select Other Vendor"
            })
        }
        const structuredData = rfpllmSchema.parse(isrfppresent.structured_requirements);
        const responseemail=await sendmail(updatevendors,structuredData,isrfppresent.id)
        if(!responseemail){
            return res.status(StatusCode.BAD_REQUEST).json({
                message:"Unable To Send the Proposal"
            })
        }
        return res.status(StatusCode.OK).json({
            message:"Proposal Was Sent Successfully"
        })
    }catch(e:any){
        console.log("Internal error While Sending the proposal",e)
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal error While Sending the proposal"
        })
    }
}