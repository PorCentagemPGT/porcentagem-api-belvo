/*
  Warnings:

  - You are about to drop the `BelvoAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BelvoAccount";

-- CreateTable
CREATE TABLE "LinkBankAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkBankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkBankAccount_linkId_key" ON "LinkBankAccount"("linkId");

-- CreateIndex
CREATE INDEX "LinkBankAccount_userId_idx" ON "LinkBankAccount"("userId");

-- CreateIndex
CREATE INDEX "LinkBankAccount_linkId_idx" ON "LinkBankAccount"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_linkId_key" ON "BankAccount"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_bankAccountId_key" ON "BankAccount"("bankAccountId");

-- CreateIndex
CREATE INDEX "BankAccount_userId_idx" ON "BankAccount"("userId");

-- CreateIndex
CREATE INDEX "BankAccount_linkId_idx" ON "BankAccount"("linkId");
