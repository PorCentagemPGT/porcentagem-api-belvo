/*
  Warnings:

  - You are about to drop the column `institutionName` on the `BankAccount` table. All the data in the column will be lost.
  - Added the required column `category` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "institutionName",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
