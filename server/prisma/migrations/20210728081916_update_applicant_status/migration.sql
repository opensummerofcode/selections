/*
  Warnings:

  - The values [UNDECIDED] on the enum `applicantStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "applicantStatus_new" AS ENUM ('ACCEPTED', 'REJECTED', 'NO STATUS', 'MAYBE');
ALTER TABLE "Applicant" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Applicant" ALTER COLUMN "status" TYPE "applicantStatus_new" USING ("status"::text::"applicantStatus_new");
ALTER TYPE "applicantStatus" RENAME TO "applicantStatus_old";
ALTER TYPE "applicantStatus_new" RENAME TO "applicantStatus";
DROP TYPE "applicantStatus_old";
ALTER TABLE "Applicant" ALTER COLUMN "status" SET DEFAULT 'NO STATUS';
COMMIT;

-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "status" SET DEFAULT E'NO STATUS';
