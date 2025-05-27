-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('enabled', 'disabled');

-- DropIndex
DROP INDEX "BankAccount_linkId_key";

-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'enabled';
