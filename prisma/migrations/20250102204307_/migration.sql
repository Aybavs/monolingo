-- AlterTable
ALTER TABLE "users" ADD COLUMN     "user_role" TEXT NOT NULL DEFAULT 'user',
ALTER COLUMN "current_language_id" SET DEFAULT 1;
