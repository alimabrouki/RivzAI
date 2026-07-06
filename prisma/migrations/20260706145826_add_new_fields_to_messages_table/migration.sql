/*
  Warnings:

  - Added the required column `animated` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reaction` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "animated" BOOLEAN NOT NULL,
ADD COLUMN     "reaction" TEXT NOT NULL;
