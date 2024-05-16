/*
  Warnings:

  - You are about to drop the column `target` on the `books` table. All the data in the column will be lost.
  - Added the required column `class` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `target`,
    ADD COLUMN `class` VARCHAR(50) NOT NULL;
