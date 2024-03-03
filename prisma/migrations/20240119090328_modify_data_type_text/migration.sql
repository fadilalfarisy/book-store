/*
  Warnings:

  - Added the required column `misi` to the `misi` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `books_description_key` ON `books`;

-- DropIndex
DROP INDEX `books_title_key` ON `books`;

-- AlterTable
ALTER TABLE `books` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `company` MODIFY `description` TEXT NOT NULL,
    MODIFY `visi` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `misi` ADD COLUMN `misi` TEXT NOT NULL;
