ALTER TABLE `users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` MODIFY COLUMN `user_id` int NOT NULL;