/*
  Warnings:

  - Made the column `fact` on table `Brew` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Brew" ALTER COLUMN "fact" SET NOT NULL;
