/*
  Warnings:

  - A unique constraint covering the columns `[verified_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verified_token" TEXT,
ADD COLUMN     "verified_token_expires" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_verified_token_key" ON "User"("verified_token");
