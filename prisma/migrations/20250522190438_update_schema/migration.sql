/*
  Warnings:

  - You are about to drop the `LinkBankAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LinkBankAccount";

-- CreateTable
CREATE TABLE "LinkBank" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkBank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkBank_linkId_key" ON "LinkBank"("linkId");

-- CreateIndex
CREATE INDEX "LinkBank_userId_idx" ON "LinkBank"("userId");

-- CreateIndex
CREATE INDEX "LinkBank_linkId_idx" ON "LinkBank"("linkId");
