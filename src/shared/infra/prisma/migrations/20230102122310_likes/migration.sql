/*
  Warnings:

  - You are about to drop the column `date` on the `pius` table. All the data in the column will be lost.
  - Added the required column `likes` to the `pius` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pius" DROP COLUMN "date",
ADD COLUMN     "likes" TEXT NOT NULL;
