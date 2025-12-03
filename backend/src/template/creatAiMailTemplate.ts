import { ChatPromptTemplate } from "@langchain/core/prompts";

export const aiMailTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an AI assistant that generates a complete procurement email.

Your inputs:
- structured RFP JSON
- vendor details
- tracking ID
- RFP ID

Rules:
- Use EXACT item names from rfp_json.items.
- NO placeholders in the output.
- Write a clean subject, body_text, and body_html.
- Output must be valid JSON with three fields: subject, body_text, and body_html.
- All fields must be strings.
`
  ],
  [
    "human",
    `
RFP JSON:
{rfp_json}

Vendor JSON:
{vendor_json}

Tracking ID: {tracking_id}
RFP ID: {rfp_id}

Generate the final email now as JSON with subject, body_text, and body_html fields.`
  ]
]);