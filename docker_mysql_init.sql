CREATE DATABASE IF NOT EXISTS `socialyDB`;

USE `socialyDB`;

CREATE TABLE IF NOT EXISTS `post_comment`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` BIGINT NOT NULL,
    `profile_id` BIGINT NOT NULL,
    `comment_text` LONGTEXT NOT NULL,
    `created_at` DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS `user_profile`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `is_email_confirmation` TINYINT(1) NOT NULL DEFAULT '0',
    `password` VARCHAR(255) NOT NULL,
    `avatar_url` TEXT NOT NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `state` TEXT NULL,
    `city` VARCHAR(255) NULL,
    `street` TEXT NULL,
    `postal_code` VARCHAR(255) NULL,
    `created_at` DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS `post_like`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` BIGINT NOT NULL,
    `profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS `friendship_status`(
    `id` BIGINT NOT NULL,
    `status` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `friendship`(
    `profile_request` BIGINT NOT NULL,
    `profile_accept` BIGINT NOT NULL,
    `status` BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `comment_like`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comment_id` BIGINT NOT NULL,
    `profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);


CREATE TABLE `user_post`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `profile_id` BIGINT NOT NULL,
    `shared_post_id` BIGINT NULL,
    `post_text` LONGTEXT NULL,
    `media_loaction` VARCHAR(255) NOT NULL,
    `share_count` BIGINT NOT NULL,
    `comment_count` BIGINT NOT NULL,
    `is_shared` TINYINT(1) NOT NULL DEFAULT '0',
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);

ALTER TABLE
    `post_comment` ADD CONSTRAINT `post_comment_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `post_comment` ADD CONSTRAINT `post_comment_post_id_foreign` FOREIGN KEY(`post_id`) REFERENCES `user_post`(`id`);

ALTER TABLE
    `user_profile` ADD UNIQUE `user_profile_email_unique`(`email`);

ALTER TABLE
    `post_like` ADD CONSTRAINT `post_like_post_id_foreign` FOREIGN KEY(`post_id`) REFERENCES `user_post`(`id`);
ALTER TABLE
    `post_like` ADD CONSTRAINT `post_like_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);

ALTER TABLE
    `friendship_status` ADD PRIMARY KEY(`id`);

ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_profile_request_foreign` FOREIGN KEY(`profile_request`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_status_foreign` FOREIGN KEY(`status`) REFERENCES `friendship_status`(`id`);
ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_profile_accept_foreign` FOREIGN KEY(`profile_accept`) REFERENCES `user_profile`(`id`);

ALTER TABLE
    `comment_like` ADD CONSTRAINT `comment_like_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `comment_like` ADD CONSTRAINT `comment_like_comment_id_foreign` FOREIGN KEY(`comment_id`) REFERENCES `post_comment`(`id`);

ALTER TABLE
    `user_post` ADD CONSTRAINT `user_post_shared_post_id_foreign` FOREIGN KEY(`shared_post_id`) REFERENCES `user_post`(`id`);
ALTER TABLE
    `user_post` ADD CONSTRAINT `user_post_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `user_post` ADD CONSTRAINT `user_post_shared_post_id_foreign` FOREIGN KEY(`shared_post_id`) REFERENCES `user_post`(`id`);

