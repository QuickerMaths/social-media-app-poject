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
    `id` BIGINT NOT NULL PRIMARY KEY,
    `status` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `friendship`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `profile_request_id` BIGINT NOT NULL,
    `profile_accept_id` BIGINT NOT NULL,
    `status_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `comment_like`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comment_id` BIGINT NOT NULL,
    `profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS `user_post`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `profile_id` BIGINT NOT NULL,
    `shared_post_id` BIGINT NULL DEFAULT NULL,
    `post_text` LONGTEXT NULL,
    `media_location` VARCHAR(255) NULL DEFAULT NULL,
    `share_count` BIGINT NOT NULL,
    `comment_count` BIGINT NOT NULL,
    `is_shared` TINYINT(1) NOT NULL DEFAULT '0',
    `created_at` DATETIME NOT NULL
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
    `friendship` ADD CONSTRAINT `friendship_profile_request_id_foreign` FOREIGN KEY(`profile_request_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_status_id_foreign` FOREIGN KEY(`status_id`) REFERENCES `friendship_status`(`id`);
ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_profile_accept_id_foreign` FOREIGN KEY(`profile_accept_id`) REFERENCES `user_profile`(`id`);

ALTER TABLE
    `comment_like` ADD CONSTRAINT `comment_like_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `comment_like` ADD CONSTRAINT `comment_like_comment_id_foreign` FOREIGN KEY(`comment_id`) REFERENCES `post_comment`(`id`);

ALTER TABLE
    `user_post` ADD CONSTRAINT `user_post_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `user_post` ADD CONSTRAINT `user_post_shared_post_id_foreign` FOREIGN KEY(`shared_post_id`) REFERENCES `user_post`(`id`);

INSERT INTO `friendship_status` (`id`, `status`) VALUES (1, 'pending');
INSERT INTO `friendship_status` (`id`, `status`) VALUES (2, 'accepted');
INSERT INTO `friendship_status` (`id`, `status`) VALUES (3, 'declined');
INSERT INTO `friendship_status` (`id`, `status`) VALUES (4, 'blocked');