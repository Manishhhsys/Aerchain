import {z} from "zod"

export const proposalLlmSchema=z.object({
    tracking_id:z.string().nullable(),
    rfp_id:z.string().nullable(),
    proposal:z.object({
        price_total:z.number().nullable(),
        delivery_days:z.number().nullable(),
        warranty_years:z.number().nullable(),
        payment_terms:z.string().nullable(),
        item_breakdown:z.array(z.object({
            item_name:z.string(),
            unit_price:z.number().nullable(),
            quantity:z.number().nullable(),
            total_price:z.number().nullable(),
            specifications:z.record(z.string(),z.union([z.string(), z.number(), z.boolean()]))
        })),
        additional_notes:z.array(z.string()).optional().default([])
    })
})