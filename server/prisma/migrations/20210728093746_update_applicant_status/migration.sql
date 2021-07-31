-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_addressId_fkey";

-- AlterTable
ALTER TABLE "Applicant" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Applicant" ADD FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
