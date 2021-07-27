-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('GITHUB');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "OAuthProvider";
