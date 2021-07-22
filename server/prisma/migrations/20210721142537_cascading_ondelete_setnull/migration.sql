/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_leadCoachId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Project.uuid_unique" ON "Project"("uuid");

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("leadCoachId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
