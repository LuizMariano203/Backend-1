/*
  Warnings:

  - Added the required column `birthday` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "birthday" TEXT NOT NULL;
