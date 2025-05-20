-- CreateTable
CREATE TABLE "BelvoAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BelvoAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BelvoAccount_linkId_key" ON "BelvoAccount"("linkId");

-- CreateIndex
CREATE INDEX "BelvoAccount_userId_idx" ON "BelvoAccount"("userId");

-- CreateIndex
CREATE INDEX "BelvoAccount_linkId_idx" ON "BelvoAccount"("linkId");
