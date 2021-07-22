-- DropForeignKey
ALTER TABLE "ApplicantsOnProjects" DROP CONSTRAINT "ApplicantsOnProjects_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicantsOnProjects" DROP CONSTRAINT "ApplicantsOnProjects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnProjects" DROP CONSTRAINT "UsersOnProjects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnProjects" DROP CONSTRAINT "UsersOnProjects_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "image_url" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UsersOnProjects" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnProjects" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantsOnProjects" ADD FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantsOnProjects" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
