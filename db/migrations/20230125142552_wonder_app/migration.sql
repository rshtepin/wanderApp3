-- DropForeignKey
ALTER TABLE "Variable_value" DROP CONSTRAINT "Variable_value_id_product_fkey";

-- DropForeignKey
ALTER TABLE "Variable_value" DROP CONSTRAINT "Variable_value_id_variable_fkey";

-- AddForeignKey
ALTER TABLE "Variable_value" ADD CONSTRAINT "Variable_value_id_variable_fkey" FOREIGN KEY ("id_variable") REFERENCES "Product_variable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variable_value" ADD CONSTRAINT "Variable_value_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
