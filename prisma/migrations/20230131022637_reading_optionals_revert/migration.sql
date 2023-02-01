/*
  Warnings:

  - Made the column `title` on table `readings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtitle` on table `readings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `readings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "readings" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "subtitle" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;
