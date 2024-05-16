/*
  Warnings:

  - You are about to drop the column `blog_id` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_blog_id_fkey`;

-- AlterTable
ALTER TABLE `blogs` DROP COLUMN `blog_id`,
    ADD COLUMN `category_id` VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category_blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
