import { modelinit } from "../modelinit.services";
import { compareLllSchema } from "../../../schema/compareLlmSchema";
import { compareAiTemplate } from "../../../template/compareAiTemplate";
import { rfpllmSchema } from "../../../schema/rfpllmSchema";
const compareStructurellm = modelinit.withStructuredOutput(compareLllSchema)
const compareLLm = compareAiTemplate.pipe(compareStructurellm)

export const getcompare = async (rfp_json: unknown, vendor_proposals: unknown) => {
    const parsedRfp = rfpllmSchema.safeParse(rfp_json);
    if (!parsedRfp.success) {
        throw new Error("Invalid RFP structured JSON format");
    }
    console.log("Parsed Rfp Details",parsedRfp)
    console.log("venor proposal",vendor_proposals)
    const llmresponse = await compareLLm.invoke({
        rfp_json: JSON.stringify(parsedRfp, null, 2),
        vendor_proposals: JSON.stringify(vendor_proposals, null, 2),
    })
    return llmresponse
}