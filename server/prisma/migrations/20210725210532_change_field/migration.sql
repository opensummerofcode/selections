/*
  Warnings:

  - The primary key for the `ApplicantSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ApplicantSkill" DROP CONSTRAINT "ApplicantSkill_pkey",
ADD PRIMARY KEY ("applicantId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill.name_unique" ON "Skill"("name");
