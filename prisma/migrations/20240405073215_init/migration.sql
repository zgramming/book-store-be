/*
  Warnings:

  - Added the required column `qty` to the `transaction_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction_detail" ADD COLUMN     "qty" INTEGER NOT NULL;
