/*
  Warnings:

  - You are about to drop the `Product_variables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variable_values` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Variable_values" DROP CONSTRAINT "Variable_values_id_product_fkey";

-- DropForeignKey
ALTER TABLE "Variable_values" DROP CONSTRAINT "Variable_values_id_variable_fkey";

-- DropTable
DROP TABLE "Product_variables";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "Variable_values";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "logo" TEXT,
    "order" SERIAL NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_variable" (
    "id" SERIAL NOT NULL,
    "var" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" SERIAL NOT NULL,

    CONSTRAINT "Product_variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variable_value" (
    "id" SERIAL NOT NULL,
    "id_variable" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "value" TEXT,
    "order" SERIAL NOT NULL,

    CONSTRAINT "Variable_value_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Variable_value_id_product_id_variable_key" ON "Variable_value"("id_product", "id_variable");

-- AddForeignKey
ALTER TABLE "Variable_value" ADD CONSTRAINT "Variable_value_id_variable_fkey" FOREIGN KEY ("id_variable") REFERENCES "Product_variable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variable_value" ADD CONSTRAINT "Variable_value_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
