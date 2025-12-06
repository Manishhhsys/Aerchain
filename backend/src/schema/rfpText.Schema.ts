import z from "zod";


export const rfpTextSchema=z.object({
    name:z.string({message:"Please Give An Name To the RFp"}),
    raw_text:z.string({
        message:"Please Give an Plain Text"
    })
})