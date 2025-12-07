# AI-Powered RFP Management System  
A complete end-to-end procurement workflow powered by AI, built for the Aerchain Take-Home Assignment.

This system automates the full RFP lifecycle:
- Create RFPs from natural language  
- Manage vendors and send personalized RFP emails  
- Receive vendor responses via IMAP (real-time)  
- Extract structured proposals from messy emails/PDFs  
- Compare proposals and recommend the best vendor  

---

# 1. Project Setup

## 1.a Prerequisites
- **Node.js** v18+  
- **PostgreSQL** 14+  
- **A Gmail account** for SMTP + IMAP  
- **Groq API Key**

---

# 1.b Installation (Backend)

```bash
git clone https://github.com/Manishhhsys/Aerchain
cd backend
npm install
```

# 1.c Copy .env.example to .env
```bash
cat .env.example > .env
```

# 1.d Replace the Environment Variables with the Your Value
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/aerchain"
_PORT=3000
GROQ_KEY= ##Get the Api Key here(https://groq.com/)
GMAIL_USER="example@gmail.com" 
CLIENT_ID= ###Use this GPT Chat session(https://gemini.google.com/share/eba5319dba6f) To get clientId,CLIENT_SECRET,REFRESH_TOKEN
CLIENT_SECRET=
REFRESH_TOKEN=
APP_PASSWORD= ###Search App password on google click the 1st link and make sure that 2FA is Enable the generate the App paassword 
### MAke sure to remove the Space Between the Value (fvpt wrji dwsx ywdx)->(fvptwrjidwsxywdx)
```
# 1.e Database Setup
```bash
npx prisma migrate dev
npx prisma db seed 
```
# 1.f Backend Start
```bash
npm run dev
```

# 2. (Frontend)

# 2.a Copy .env.example to .env
```bash
cat .env.example > .env
```

# 2.b Replace the Environment Variables with the Your Value
```bash
VITE_API_BACKEND_URL= ###http://localhost:3000/api
```
# 2.c Installation(Frontend)
```bash
cd frontend
npm i
```
# 2.d Frontend Start
```bash
npm run dev
```
## 3. Tech Stack

- **Frontend:** React, Vite, TailwindCSS, shadcn/ui  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL + Prisma ORM  
- **AI Provider:** Groq (llama-3.3-70b-versatile)  
- **Email Sending:** Nodemailer (SMTP)  
- **Email Receiving:** ImapFlow (IDLE mode)  
- **Parsing:** MailParser, pdf-parse  
- **LLM Orchestration:** LangChain JS + Zod structured outputs  
- **ID Generation:** nanoid  

## 4. API Documentation

### 4.a **POST /api/rfp/create-rfp**
Create an RFP from natural language text.

#### Request
```json
{
  "name":"Aerchain1",
  "raw_text": "We need 20 laptops, 16GB RAM, delivery in 30 days..."
}
```

### Response
```json
{
  "message": "Success",
  "rfp_id": "uuid"
}
```
### 4.b **POST /api/rfp/:rfp_id/send**
Send RFP emails to selected vendors.

#### **Request**
```json
{
  "vendors_ids": ["id1", "id2"],
}
```
#### **Response**
```json
{
  "message": "Emails sent successfully"
}
```
### 4.c **GET /api/vendor/list**
Fetch Vendor 
#### **Response**
```json
{
  "data": []
}
```

### 4.d **GET /api/rfp/:rfp_id/compare**
Compare vendor proposals and get AI recommendation.
#### **Response**
```json
{
  {
  "data": [
    {
      "vendor_id": "string",
      "vendor_name": "string",
      "summary": "Short summary of the vendor's proposal",
      "strengths": [
        "Strength point 1",
        "Strength point 2"
      ],
      "weaknesses": [
        "Weakness point 1",
        "Weakness point 2"
      ],
      "score": 0
    }
  ],
  "comparison_overview": "High-level overview comparing all vendors.",
  "recommended_vendor": {
    "vendor_id": "string",
    "vendor_name": "string",
    "reason": "Explanation for recommendation."
  }
}
}
```

### 4.e **GET /api/rfp/:rfp_id/received**
Get Proposal Received
#### **Response**
```json
{
  "message":"Success",
  "data": [
    {
        "name":"Test2",
        "company":"Test1"
    }
  ]
}
```
### 4.f **GET /api/rfp/getrfp**
Get RFP List
#### **Response**
```json
{
  "message":"Success",
  "data": [
    {
        "id":"Test2",
        "company":"Test1",
        "name":"Test2"
    }
  ]
}
```

## 5. Decisions & Assumptions

### 5.a Key Design Decisions

- **Structured JSON everywhere**  
  All LLM outputs use Zod validation to prevent hallucinations and guarantee predictable schema.

- **Tracking ID + RFP ID embedded in email footer**  
  Ensures IMAP replies can always be matched correctly to the right vendor and RFP.

- **JSONB in PostgreSQL**  
  Ideal for storing flexible and evolving AI-generated structured data without schema migration overhead.

- **Real-time IMAP listener instead of cron jobs**  
  Provides instant vendor proposal ingestion as soon as emails arrive, improving responsiveness and system flow.

## 6. AI Tools Usage

### 6.a Tools Used

- **ChatGPT** – Helped with frontend component design, UI structure.
- **Claude** – Assisted with code review, refining LLM templates.

## 7. What I Learned

- **AI-driven parsing requires strict schemas**  
  Reliable structured outputs depend on enforcing Zod validation and clear LLM constraints.

- **IMAP listeners need careful error handling**  
  Real-time email ingestion exposes edge cases like malformed emails, connection resets, and race conditions.

- **Email workflows require explicit identifiers**  
  Tracking IDs and RFP IDs are essential for correctly mapping vendor replies to the right request.

- **JSONB is perfect for flexible AI outputs**  
  It allows storing evolving AI-generated data structures without needing schema migrations.

## 8. Additional Notes (Limitations & Future Work)

### **Current Limitations**

- **IMAP IDLE timeout (Gmail ~30 minutes)**  
  Gmail automatically drops IMAP IDLE connections after ~30 minutes.  
  A reconnect loop or a backup cron job needs to be implemented to maintain continuous listening.

- **No way to notify vendors about missing tracking identifiers**  
  If a vendor replies without including the **tracking_id** or **rfp_id**, the system cannot associate the proposal with any RFP.  
  Currently, such emails are ignored because they cannot be mapped.

- **Repeated proposals treated as new emails**  
  If a vendor resends the same proposal or replies multiple times, the system treats each as a new submission due to lack of duplicate detection.

---

### **Future Work**

- **AI-based Vendor Recommendation Prior to Sending RFPs**  
  Use the structured RFP requirements + vendor metadata to pre-rank vendors.  
  This increases the chances of selecting vendors who are highly relevant to the requested items.

- **Proposal similarity detection**  
  Detect duplicate or near-duplicate vendor responses to avoid double counting.










