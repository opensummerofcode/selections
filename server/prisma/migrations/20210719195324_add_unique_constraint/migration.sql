/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Applicant.uuid_unique" ON "Applicant"("uuid");
