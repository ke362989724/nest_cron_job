/*
  Warnings:

  - Made the column `name` on table `sector_etfs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."sector_etfs" ALTER COLUMN "name" SET NOT NULL;
