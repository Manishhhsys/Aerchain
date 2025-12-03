import {z} from "zod"

export const mailLlmSchema=z.object({
    subject:z.string(),
    body_text:z.string(),
    body_html:z.string()
})