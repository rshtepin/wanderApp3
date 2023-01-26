/*
  Warnings:

  - You are about to drop the column `longdesc` on the `Product_variable` table. All the data in the column will be lost.
  - You are about to drop the column `shortdesc` on the `Product_variable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "longdesc" TEXT,
ADD COLUMN     "shortdesc" TEXT;

-- AlterTable
ALTER TABLE "Product_variable" DROP COLUMN "longdesc",
DROP COLUMN "shortdesc";
