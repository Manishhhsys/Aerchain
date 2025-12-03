import { ImapFlow } from "imapflow";
import { config } from "dotenv";
config()
export const client=new ImapFlow({
    host:"imap.gmail.com",
    port:993,
    secure:true,
    auth:{
        user:process.env.GMAIL_USER!,
        pass:process.env.APP_PASSWORD!,
    }
})