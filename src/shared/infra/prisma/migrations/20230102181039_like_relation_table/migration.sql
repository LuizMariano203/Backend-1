/*
  Warnings:

  - You are about to drop the column `likes` on the `pius` table. All the data in the column will be lost.
  - You are about to drop the `LikeRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikeRelation" DROP CONSTRAINT "LikeRelation_piuId_fkey";

-- DropForeignKey
ALTER TABLE "LikeRelation" DROP CONSTRAINT "LikeRelation_usersId_fkey";

-- AlterTable
ALTER TABLE "pius" DROP COLUMN "likes";

-- DropTable
DROP TABLE "LikeRelation";

-- CreateTable
CREATE TABLE "likeRelation" (
    "id" TEXT NOT NULL,
    "piuId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "likeRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likeRelation" ADD CONSTRAINT "likeRelation_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeRelation" ADD CONSTRAINT "likeRelation_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
