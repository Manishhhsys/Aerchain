import {z} from "zod"

export const rfpllmSchema=z.object({
    budget:z.number().nullable(),
    delivery_days:z.number().nullable(),
    payment_terms:z.string().nullable(),
    warranty_years:z.number().nullable(),
    items:z.array(z.object({
        name:z.string(),
        quantity:z.number().nullable(),
        specifications:z.record(
  z.string(),                                  
  z.union([z.string(), z.number(), z.boolean()])
)
    })),
    additional_notes:z.array(z.string()).optional()
})