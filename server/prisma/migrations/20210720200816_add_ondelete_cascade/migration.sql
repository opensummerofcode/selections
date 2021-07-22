/*
  Warnings:

  - You are about to drop the column `template_url` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Suggestion" DROP CONSTRAINT "Suggestion_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "Suggestion" DROP CONSTRAINT "Suggestion_suggesterId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "template_url",
ADD COLUMN     "templateUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD FOREIGN KEY ("suggesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
