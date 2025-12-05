import { proposalLlmSchema } from "../../../schema/proposalLlmSchema";
import { getPropsalTemplate } from "../../../template/getPropsalTemplate";
import { modelinit } from "../modelinit.services";
const propsalStructure=modelinit.withStructuredOutput(proposalLlmSchema)
const proposal=getPropsalTemplate.pipe(propsalStructure)
export const getProposalStructured=async (subject:String,html_text:String,attachment:any)=>{
    const llmresponse=await proposal.invoke({
        subject:subject,
        html_text:html_text,
        attachment_text:attachment
    })
    return llmresponse
}