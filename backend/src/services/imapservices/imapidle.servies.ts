import { isvendoremail } from "../../lib/isvendoremail";
import { getPdfData } from "../../utils/getPdfDate";
import prisma from "../../utils/prisma.client";
import { getProposalStructured } from "../aiservices/getProposal/getProposalStr.services";
import { client } from "./imapinit.services"
import { simpleParser } from "mailparser";
export const listenmail = async () => {
    await client.connect()
    const mailbox = await client.mailboxOpen("INBOX");
    client.on("exists", async () => {
        const lock = await client.getMailboxLock("INBOX");
        try {
            const latestmail = await client.fetchOne(mailbox.exists, {
                source: true
            })
            if (!latestmail) {
                console.log("No message found for seq:");
                return;
            }
            if (!latestmail.source) {
                console.log("no source found");
                return;

            }
            const parasedmail = await simpleParser(latestmail.source)
            console.log("The NEw MAil SUbject is", parasedmail.subject)
            console.log("The NEW MAil Body is", parasedmail.text)
            console.log("THe New Attachment", parasedmail.attachments)
            const findvendoremail=await isvendoremail(parasedmail.from?.value[0]?.address!)
            if(!findvendoremail){
                return 
            }
            let attachment_text = null
            if (parasedmail.attachments.length > 0) {
                const att = parasedmail.attachments[0];
                if (att.contentType === "application/pdf") {
                    attachment_text = await getPdfData(att);
                }
            }
            const llmresponse = await getProposalStructured(parasedmail.subject || "", parasedmail.html || parasedmail.text || "", attachment_text)
            if (!llmresponse.rfp_id) {
                throw new Error("RFP ID is required")
            }
            if(!llmresponse.tracking_id){
                throw new Error("Tracking ID is Required")
            }
            await prisma.proposals.create({
                data: {
                    rfp_id: llmresponse.rfp_id,
                    tracking_id: llmresponse.tracking_id,
                    raw_email: parasedmail.text,
                    structured_proposal: llmresponse.proposal,
                    vendor_id: findvendoremail.id
                }
            })
        } finally {
            lock.release();
        }
    })
}
