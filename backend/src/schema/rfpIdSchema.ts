import {z} from "zod"


export const rfpIdSchmea=z.object({
    vendors_ids:z.array(z.string())
})
