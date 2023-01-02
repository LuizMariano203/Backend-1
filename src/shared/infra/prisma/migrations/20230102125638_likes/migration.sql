/*
  Warnings:

  - The `likes` column on the `pius` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pius" DROP COLUMN "likes",
ADD COLUMN     "likes" TEXT[];
