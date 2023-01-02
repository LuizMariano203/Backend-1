-- CreateTable
CREATE TABLE "pius" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pius_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pius" ADD CONSTRAINT "pius_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
