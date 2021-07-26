/*
  Warnings:

  - You are about to drop the column `level` on the `SkillLevel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `SkillLevel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `SkillLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SkillLevel.level_unique";

-- AlterTable
ALTER TABLE "SkillLevel" DROP COLUMN "level",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SkillLevel.name_unique" ON "SkillLevel"("name");
