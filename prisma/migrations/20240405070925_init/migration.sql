/*
  Warnings:

  - You are about to drop the `app_access_menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `app_access_modul` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `app_category_modul` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `app_master_icon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `app_menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `app_modul` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `master_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `master_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parameter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `template_dokumen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('loaned', 'returned');

-- DropForeignKey
ALTER TABLE "app_access_menu" DROP CONSTRAINT "app_access_menu_app_category_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "app_access_menu" DROP CONSTRAINT "app_access_menu_app_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "app_access_menu" DROP CONSTRAINT "app_access_menu_app_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "app_access_menu" DROP CONSTRAINT "app_access_menu_role_id_fkey";

-- DropForeignKey
ALTER TABLE "app_access_modul" DROP CONSTRAINT "app_access_modul_app_category_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "app_access_modul" DROP CONSTRAINT "app_access_modul_app_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "app_access_modul" DROP CONSTRAINT "app_access_modul_role_id_fkey";

-- DropForeignKey
ALTER TABLE "app_category_modul" DROP CONSTRAINT "app_category_modul_icon_id_fkey";

-- DropForeignKey
ALTER TABLE "app_menu" DROP CONSTRAINT "app_menu_app_category_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "app_menu" DROP CONSTRAINT "app_menu_app_menu_id_parent_fkey";

-- DropForeignKey
ALTER TABLE "app_menu" DROP CONSTRAINT "app_menu_app_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "app_menu" DROP CONSTRAINT "app_menu_icon_id_fkey";

-- DropForeignKey
ALTER TABLE "app_modul" DROP CONSTRAINT "app_modul_app_category_modul_id_fkey";

-- DropForeignKey
ALTER TABLE "app_modul" DROP CONSTRAINT "app_modul_icon_id_fkey";

-- DropForeignKey
ALTER TABLE "master_category" DROP CONSTRAINT "master_category_master_category_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "master_data" DROP CONSTRAINT "master_data_master_category_id_fkey";

-- DropForeignKey
ALTER TABLE "master_data" DROP CONSTRAINT "master_data_master_data_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- DropTable
DROP TABLE "app_access_menu";

-- DropTable
DROP TABLE "app_access_modul";

-- DropTable
DROP TABLE "app_category_modul";

-- DropTable
DROP TABLE "app_master_icon";

-- DropTable
DROP TABLE "app_menu";

-- DropTable
DROP TABLE "app_modul";

-- DropTable
DROP TABLE "master_category";

-- DropTable
DROP TABLE "master_data";

-- DropTable
DROP TABLE "parameter";

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "template_dokumen";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "stock" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_transaction" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'returned',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "history_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "publisher" VARCHAR(100) NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_student" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "nim" VARCHAR(50) NOT NULL,
    "status" "CommonStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "master_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "date_loan" TIMESTAMP(3) NOT NULL,
    "date_return" TIMESTAMP(3) NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'loaned',

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_detail" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_detail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "master_student_nim_key" ON "master_student"("nim");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "master_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_transaction" ADD CONSTRAINT "history_transaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_transaction" ADD CONSTRAINT "history_transaction_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "master_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "master_student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "master_book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
