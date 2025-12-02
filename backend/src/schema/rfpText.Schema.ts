import z from "zod";


export const rfpTextSchema=z.object({
    raw_text:z.string({
        message:"Please Give an Plain Text"
    })
})