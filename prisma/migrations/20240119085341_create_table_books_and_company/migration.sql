-- DropForeignKey
ALTER TABLE `misi` DROP FOREIGN KEY `Misi_company_id_fkey`;

-- AddForeignKey
ALTER TABLE `misi` ADD CONSTRAINT `misi_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
