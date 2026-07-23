/*
  Warnings:

  - The `reaction` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Reaction" AS ENUM ('like', 'dislike');

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "reaction",
ADD COLUMN     "reaction" "Reaction";
