-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "failed_login_attempts" INTEGER,
ADD COLUMN     "lockUntil" TIMESTAMP(3);
