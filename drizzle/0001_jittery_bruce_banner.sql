CREATE TABLE `packagingMaterials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`materialKey` varchar(64) NOT NULL,
	`name` varchar(160) NOT NULL,
	`category` varchar(80) NOT NULL,
	`oxygenBarrier` double NOT NULL,
	`moistureBarrier` double NOT NULL,
	`sustainability` double NOT NULL,
	`costPerUnit` double NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `packagingMaterials_id` PRIMARY KEY(`id`),
	CONSTRAINT `packagingMaterials_materialKey_unique` UNIQUE(`materialKey`)
);
--> statement-breakpoint
CREATE TABLE `recommendationRuns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`commodity` varchar(120) NOT NULL,
	`inputJson` text NOT NULL,
	`resultJson` text NOT NULL,
	`topMaterial` varchar(160) NOT NULL,
	`finalScore` double NOT NULL,
	`predictedShelfLife` double NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `recommendationRuns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scanEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`sourceName` varchar(255),
	`extractedText` text NOT NULL,
	`parsedJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `scanEvents_id` PRIMARY KEY(`id`)
);
