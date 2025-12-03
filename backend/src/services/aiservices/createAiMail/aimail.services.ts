import { modelinit } from "../modelinit.services";
import { aiMailTemplate } from "../../../template/creatAiMailTemplate";
import z from "zod";
import { rfpllmSchema } from "../../../schema/rfpllmSchema";
import { mailLlmSchema } from "../../../schema/mailLlmSchema";

interface vendorinfo {
    name: string;
    id: string;
    created_at: Date;
    email: string;
    phone: string | null;
    company: string | null;
    address: string | null;
    categories: string[];
}
const mailstructurellm=modelinit.withStructuredOutput(mailLlmSchema)
const mailTemplate=aiMailTemplate.pipe(mailstructurellm)
export const createUnimailTemplate=async(structured_text:z.infer<typeof rfpllmSchema>,vendorinfo:vendorinfo,tracking_id:string,proposal_id:string)=>{
    console.log("STRTEMP",structured_text)
    console.log("VendorInfo",vendorinfo)
    console.log("tracking_info",tracking_id)
    const llmresponse=await mailTemplate.invoke({
        rfp_json:JSON.stringify(structured_text),
        vendor_json:JSON.stringify(vendorinfo),
        tracking_id:tracking_id,
        rfp_id:proposal_id
    })
    return llmresponse
}