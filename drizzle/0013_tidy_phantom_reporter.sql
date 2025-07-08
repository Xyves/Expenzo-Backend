CREATE TABLE `budget_period` (
	`id` int NOT NULL,
	`user_id` int NOT NULL,
	`category_id` int NOT NULL,
	`amount_limit` int NOT NULL,
	`amount_spent` int,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	CONSTRAINT `budget_period_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `budgets` ADD `is_archived` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `budget_period` ADD CONSTRAINT `budget_period_id_budgets_id_fk` FOREIGN KEY (`id`) REFERENCES `budgets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_period` ADD CONSTRAINT `budget_period_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_period` ADD CONSTRAINT `budget_period_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;