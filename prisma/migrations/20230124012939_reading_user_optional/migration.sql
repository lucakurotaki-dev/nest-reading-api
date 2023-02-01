-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_user_id_fkey";

-- AlterTable
ALTER TABLE "readings" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
