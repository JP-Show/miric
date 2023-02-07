/*
  Warnings:

  - You are about to drop the column `id_anime` on the `category` table. All the data in the column will be lost.
  - You are about to drop the `anime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_media` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_id_users_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_id_anime_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "id_anime",
ADD COLUMN     "id_media" INTEGER NOT NULL;

-- DropTable
DROP TABLE "anime";

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cover" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "rate" SMALLINT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL,
    "id_users" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_id_key" ON "media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "media_name_key" ON "media"("name");

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_id_users_fkey" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_id_media_fkey" FOREIGN KEY ("id_media") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
