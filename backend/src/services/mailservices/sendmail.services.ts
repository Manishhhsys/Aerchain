import {z} from "zod";
import { rfpllmSchema } from "../../schema/rfpllmSchema";
import { createnanoid } from "../../utils/nanoidgen";
import { mailinit } from "../../config/mailinit";
import { config } from "dotenv";
import prisma from "../../utils/prisma.client";
import { createUnimailTemplate } from "../aiservices/createAiMail/aimail.services";
config()
export const sendmail=async(vendors_ids:string[],structured_text:z.infer<typeof rfpllmSchema>,rfp_id:string)=>{
    for (const vendor of vendors_ids){
        const getnanoid=createnanoid()
        const vendorinfo=await prisma.vendors.findUnique({
            where:{
                id:vendor
            }
        })
        if(!vendorinfo){
                throw new Error("Invalid Vendor ID")
        }
        const llmresponse=await createUnimailTemplate(structured_text,vendorinfo,getnanoid,rfp_id)
        console.log("LLM Response",llmresponse)
        if(!llmresponse){
            throw new Error("LLM was Unable to generate the Email")
        }
        const res=await mailinit.sendMail({
            from:`"ZTech" <${process.env.GMAIL_USER}>`,
            to:`${vendorinfo?.email}`,
            subject:`${llmresponse?.subject}`,
            text:`${llmresponse.body_text}`,
            html:`${llmresponse.body_html}`,
        })
        await prisma.sent_rfps.create({
            data:{
                vendor_id:vendorinfo.id,
                token:getnanoid,
                rfp_id:rfp_id
            }
        })

    }
    return true
}