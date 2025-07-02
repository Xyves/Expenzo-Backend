DROP TABLE `userCategories`;--> statement-breakpoint
ALTER TABLE `categories` ADD `isDefault` boolean;--> statement-breakpoint
ALTER TABLE `categories` ADD `user_id` int;--> statement-breakpoint
ALTER TABLE `users` ADD `balance` float;--> statement-breakpoint
ALTER TABLE `categories` ADD CONSTRAINT `categories_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;