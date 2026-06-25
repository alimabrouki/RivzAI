/*
  Warnings:

  - You are about to drop the column `last_reset_email_sent_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_reset_email_sent_at",
ADD COLUMN     "next_reset_email_attempt_in" TIMESTAMP(3);
