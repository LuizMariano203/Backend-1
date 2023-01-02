/*
  Warnings:

  - Added the required column `text` to the `pius` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pius" ADD COLUMN     "text" TEXT NOT NULL;
