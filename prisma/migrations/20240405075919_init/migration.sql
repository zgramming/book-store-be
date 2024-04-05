/*
  Warnings:

  - Added the required column `duration_loan_days` to the `history_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "history_transaction" ADD COLUMN     "duration_loan_days" INTEGER NOT NULL;
