-- CreateTable
CREATE TABLE `books` (
    `id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `target` VARCHAR(100) NOT NULL,
    `page` INTEGER NOT NULL,
    `size` VARCHAR(50) NOT NULL,
    `ISBN` VARCHAR(50) NOT NULL,
    `price` INTEGER NOT NULL,

    UNIQUE INDEX `books_title_key`(`title`),
    UNIQUE INDEX `books_description_key`(`description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `industry` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `visi` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Misi` (
    `id` VARCHAR(50) NOT NULL,
    `company_id` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Misi` ADD CONSTRAINT `Misi_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
