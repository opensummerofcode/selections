-- CreateEnum
CREATE TYPE "applicantStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'UNDECIDED');

-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "status" "applicantStatus" NOT NULL DEFAULT E'UNDECIDED';
