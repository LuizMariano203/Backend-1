-- AlterTable
ALTER TABLE "pius" ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "likes" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "LikeRelation" (
    "id" TEXT NOT NULL,
    "piuId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "LikeRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikeRelation" ADD CONSTRAINT "LikeRelation_piuId_fkey" FOREIGN KEY ("piuId") REFERENCES "pius"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeRelation" ADD CONSTRAINT "LikeRelation_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
