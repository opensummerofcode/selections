-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PENDING', 'COACH', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNDECIDED', 'YES', 'MAYBE', 'NO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "role" "Role" NOT NULL DEFAULT E'PENDING',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" SERIAL NOT NULL,
    "applicantId" TEXT NOT NULL,
    "suggesterId" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "response" JSONB NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'UNDECIDED',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Draft" (
    "id" SERIAL NOT NULL,
    "rationale" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "drafterId" TEXT NOT NULL,
    "profileId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Coach" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LeadCoach" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Draft_profileId_unique" ON "Draft"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "_Coach_AB_unique" ON "_Coach"("A", "B");

-- CreateIndex
CREATE INDEX "_Coach_B_index" ON "_Coach"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LeadCoach_AB_unique" ON "_LeadCoach"("A", "B");

-- CreateIndex
CREATE INDEX "_LeadCoach_B_index" ON "_LeadCoach"("B");

-- AddForeignKey
ALTER TABLE "Suggestion" ADD FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD FOREIGN KEY ("suggesterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProfile" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD FOREIGN KEY ("drafterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Draft" ADD FOREIGN KEY ("profileId") REFERENCES "ProjectProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Coach" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Coach" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeadCoach" ADD FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeadCoach" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
