ALTER TABLE `users` MODIFY COLUMN `email` varchar(36);--> statement-breakpoint
ALTER TABLE `users` ADD `name` varchar(36);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `username`;