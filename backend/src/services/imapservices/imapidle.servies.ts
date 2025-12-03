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
            console.log("The NEw MAil SUbject is",parasedmail.subject)
            console.log("The NEW MAil Body is",parasedmail.text)
            console.log("THe New Attachment",parasedmail.attachments)
        } finally {
            lock.release();
        }
    })
}
