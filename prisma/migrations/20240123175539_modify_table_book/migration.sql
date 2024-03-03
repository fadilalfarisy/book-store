/*
  Warnings:

  - Added the required column `cover_book` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_book_id` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` 
    ADD COLUMN `cover_book` VARCHAR(191) NOT NULL,
    ADD COLUMN `cover_book_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `link_shopee` VARCHAR(191) NULL,
    ADD COLUMN `link_tokopedia` VARCHAR(191) NULL;
