/*
  Warnings:

  - You are about to drop the column `next_reset_email_attempt_in` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "next_reset_email_attempt_in",
ADD COLUMN     "next_reset_email_attempt_allowed_at" TIMESTAMP(3);
