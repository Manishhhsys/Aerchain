-- CreateEnum
CREATE TYPE "StatusNum" AS ENUM ('SENT', 'RESPONDED');

-- CreateTable
CREATE TABLE "Rfps" (
    "id" TEXT NOT NULL,
    "raw_text" TEXT NOT NULL,
    "structured_requirements" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rfps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "address" TEXT,
    "categories" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sent_rfps" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "rfp_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusNum" NOT NULL DEFAULT 'SENT',

    CONSTRAINT "Sent_rfps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposals" (
    "id" TEXT NOT NULL,
    "rfp_id" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "structured_proposal" JSONB NOT NULL,
    "raw_email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proposals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendors_email_key" ON "Vendors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sent_rfps_token_key" ON "Sent_rfps"("token");

-- AddForeignKey
ALTER TABLE "Sent_rfps" ADD CONSTRAINT "Sent_rfps_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sent_rfps" ADD CONSTRAINT "Sent_rfps_rfp_id_fkey" FOREIGN KEY ("rfp_id") REFERENCES "Rfps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposals" ADD CONSTRAINT "Proposals_rfp_id_fkey" FOREIGN KEY ("rfp_id") REFERENCES "Rfps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
