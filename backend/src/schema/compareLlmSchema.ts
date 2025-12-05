import {z} from "zod"


export const compareLllSchema=z.object({
    vendors:z.array(z.object({
        vendor_id:z.string(),
        vendor_name:z.string(),
        summary:z.string(),
        strengths:z.array(z.string()),
        weaknesses:z.array(z.string()),
        score:z.number()
    })),
    comparison_overview:z.string(),
    recommended_vendor:z.object({
        vendor_id:z.string(),
        vendor_name:z.string(),
        reason:z.string()
    })
})