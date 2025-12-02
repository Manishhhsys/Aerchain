import { modelinit } from "../modelinit.services";
import { createRfpTemplate } from "../../../template/createRfptemplate";
import { rfpllmSchema } from "../../../schema/rfpllmSchema";
const modelStructure=modelinit.withStructuredOutput(rfpllmSchema);
const modeltemplate=createRfpTemplate.pipe(modelStructure)

export const getrfpparaseddata=async(raw_text:string)=>{
    const llmresponse=await modeltemplate.invoke({
        text:raw_text
    })
    return llmresponse
}

