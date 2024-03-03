-- CreateTable
CREATE TABLE `users` (
		`id` VARCHAR(50) NOT NULL,
		`email` VARCHAR(100) NOT NULL,
		`username` VARCHAR(100) NOT NULL,
		`password` VARCHAR(100) NOT NULL,
		`role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
		`verified` BOOLEAN NOT NULL DEFAULT false,

		UNIQUE INDEX `users_email_key`(`email`),
		UNIQUE INDEX `users_username_key`(`username`),
		PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `token` (
		`id` VARCHAR(50) NOT NULL,
		`token` VARCHAR(100) NOT NULL,
		`expire` DATETIME(3) NOT NULL,
		`user_id` VARCHAR(50) NOT NULL,

		UNIQUE INDEX `token_token_key`(`token`),
		PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `token` ADD CONSTRAINT `token_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
