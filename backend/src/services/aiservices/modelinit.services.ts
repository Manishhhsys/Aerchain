import { ChatGroq } from "@langchain/groq";
import { config } from "dotenv";

config()

export const modelinit=new ChatGroq({
    model:"llama-3.3-70b-versatile",
    apiKey:process.env.GROQ_KEY
})