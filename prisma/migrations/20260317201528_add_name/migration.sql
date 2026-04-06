/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sector_etfs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."sector_etfs" ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sector_etfs_name_key" ON "public"."sector_etfs"("name");
