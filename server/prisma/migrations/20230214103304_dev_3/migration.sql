/*
  Warnings:

  - You are about to drop the column `rating` on the `film_review` table. All the data in the column will be lost.
  - Added the required column `username` to the `film_review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "film_review" DROP COLUMN "rating",
ADD COLUMN     "created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" VARCHAR NOT NULL;
