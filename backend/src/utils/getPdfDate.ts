import { PDFParse } from "pdf-parse"


export const getPdfData=async(attachment:any)=>{
    const pdf=new PDFParse({data:attachment.content})
    const pdfData=await pdf.getText(attachment.content)
    return pdfData.text
}