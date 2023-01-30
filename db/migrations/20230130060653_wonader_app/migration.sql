/*
  Warnings:

  - Added the required column `id_group` to the `Product_variable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product_variable" ADD COLUMN     "id_group" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Field_group" (
    "id" SERIAL NOT NULL,
    "var" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" SERIAL NOT NULL,

    CONSTRAINT "Field_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Field_group_var_key" ON "Field_group"("var");

-- AddForeignKey
ALTER TABLE "Product_variable" ADD CONSTRAINT "Product_variable_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Field_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
