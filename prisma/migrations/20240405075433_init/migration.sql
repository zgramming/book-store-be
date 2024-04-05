/*
  Warnings:

  - Added the required column `student_id` to the `history_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "history_transaction" ADD COLUMN     "student_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "history_transaction" ADD CONSTRAINT "history_transaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "master_student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
