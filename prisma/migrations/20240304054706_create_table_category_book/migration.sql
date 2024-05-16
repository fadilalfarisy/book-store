/*
  Warnings:

  - You are about to drop the column `visi` on the `company` table. All the data in the column will be lost.
  - You are about to drop the `misi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publish_year` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mission` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vision` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `misi` DROP FOREIGN KEY `misi_company_id_fkey`;

-- AlterTable
ALTER TABLE `books` ADD COLUMN `category_id` VARCHAR(50) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `publish_year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `visi`,
    ADD COLUMN `mission` TEXT NOT NULL,
    ADD COLUMN `vision` TEXT NOT NULL;

-- DropTable
DROP TABLE `misi`;

-- CreateTable
CREATE TABLE `category_book` (
    `id` VARCHAR(50) NOT NULL,
    `category` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category_book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
