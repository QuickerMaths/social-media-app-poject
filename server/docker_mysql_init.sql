CREATE DATABASE IF NOT EXISTS `socialyDB`;

USE `socialyDB`;

CREATE TABLE IF NOT EXISTS `post_comment`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` BIGINT NOT NULL,
    `profile_id` BIGINT NOT NULL,
    `comment_text` LONGTEXT NOT NULL,
    `like_count` BIGINT NOT NULL DEFAULT '0',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS `user_profile`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `is_email_confirmation` TINYINT(1) NOT NULL DEFAULT '0',
    `password` VARCHAR(255) NOT NULL,
    `avatar_url` TEXT NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `state` TEXT NULL,
    `city` VARCHAR(255) NULL,
    `street` TEXT NULL,
    `postal_code` VARCHAR(255) NULL,
    `friend_request_count` BIGINT NOT NULL DEFAULT '0',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `refresh_token`(
    `token` VARCHAR(255) NOT NULL PRIMARY KEY,
    `profile_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `post_like`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `profile_id` BIGINT NOT NULL,
    `post_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL
);


CREATE TABLE IF NOT EXISTS `friendship_status`(
    `id` BIGINT NOT NULL PRIMARY KEY,
    `status` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `friendship`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `profile_request_id` BIGINT NOT NULL,
    `profile_responder_id` BIGINT NOT NULL,
    `status_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `a_ordered` varchar(100) as (least(`profile_request_id`, `profile_responder_id`)) STORED,
    `b_ordered` varchar(100) as (greatest(`profile_request_id`, `profile_responder_id`)) STORED,
    unique key `unique_friendship_pair` (`a_ordered`, `b_ordered`)
);

CREATE TABLE IF NOT EXISTS `comment_like`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comment_id` BIGINT NOT NULL,
    `profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL
);

CREATE TABLE IF NOT EXISTS `user_post`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `profile_id` BIGINT NOT NULL,
    `shared_post_id` BIGINT NULL DEFAULT NULL,
    `post_text` LONGTEXT NULL,
    `media_location` VARCHAR(255) NULL DEFAULT NULL,
    `like_count` BIGINT NOT NULL DEFAULT '0',
    `share_count` BIGINT NOT NULL DEFAULT '0',
    `comment_count` BIGINT NOT NULL DEFAULT '0',
    `is_shared` BOOLEAN NOT NULL DEFAULT '0',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE
    `post_comment` ADD CONSTRAINT `post_comment_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `post_comment` ADD CONSTRAINT `post_comment_post_id_foreign` FOREIGN KEY(`post_id`) REFERENCES `user_post`(`id`) ON DELETE CASCADE;

ALTER TABLE
    `user_profile` ADD UNIQUE `user_profile_email_unique`(`email`);

ALTER TABLE
    `post_like` ADD CONSTRAINT `post_like_post_id_foreign` FOREIGN KEY(`post_id`) REFERENCES `user_post`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `post_like` ADD CONSTRAINT `post_like_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE `post_like` ADD CONSTRAINT `unique_post_profile` UNIQUE (`post_id`, `profile_id`);

ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_profile_request_id_foreign` FOREIGN KEY(`profile_request_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_status_id_foreign` FOREIGN KEY(`status_id`) REFERENCES `friendship_status`(`id`);
ALTER TABLE
    `friendship` ADD CONSTRAINT `friendship_profile_responder_id_foreign` FOREIGN KEY(`profile_responder_id`) REFERENCES `user_profile`(`id`);

ALTER TABLE
    `comment_like` ADD CONSTRAINT `comment_like_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `comment_like` ADD CONSTRAINT `comment_like_comment_id_foreign` FOREIGN KEY(`comment_id`) REFERENCES `post_comment`(`id`) ON DELETE CASCADE;
ALTER TABLE `comment_like` ADD CONSTRAINT `unique_comment_profile` UNIQUE (`comment_id`, `profile_id`);

ALTER TABLE
    `user_post` ADD CONSTRAINT `user_post_profile_id_foreign` FOREIGN KEY(`profile_id`) REFERENCES `user_profile`(`id`);
ALTER TABLE
    `user_post` ADD CONSTRAINT `user_post_shared_post_id_foreign` FOREIGN KEY(`shared_post_id`) REFERENCES `user_post`(`id`);

INSERT INTO `friendship_status` (`id`, `status`) VALUES (1, 'accepted');
INSERT INTO `friendship_status` (`id`, `status`) VALUES (2, 'pending');


DELIMITER $$

CREATE TRIGGER increment_like_count_user_post_after_update
AFTER UPDATE ON post_like 
FOR EACH ROW
BEGIN
    UPDATE user_post 
    SET like_count = CASE  
        WHEN NEW.created_at IS NOT NULL 
        THEN like_count + 1 
        ELSE like_count - 1 
        END 
    WHERE id = NEW.post_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER increment_like_count_user_post_after_insert
AFTER INSERT ON post_like 
FOR EACH ROW
BEGIN
    UPDATE user_post 
    SET like_count = like_count + 1 
    WHERE id = NEW.post_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER increment_comment_count
AFTER INSERT ON post_comment 
FOR EACH ROW
BEGIN
    UPDATE user_post
    SET comment_count = comment_count + 1
    WHERE id = NEW.post_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER decrement_comment_count
AFTER DELETE ON post_comment 
FOR EACH ROW
BEGIN
    UPDATE user_post
    SET comment_count = comment_count - 1
    WHERE id = OLD.post_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER increment_like_count_post_comment_after_insert
AFTER INSERT ON comment_like 
FOR EACH ROW
BEGIN
    UPDATE post_comment 
    SET like_count = like_count + 1 
    WHERE id = NEW.comment_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER increment_like_count_post_comment_after_update
AFTER UPDATE ON comment_like 
FOR EACH ROW
BEGIN
    UPDATE post_comment 
    SET like_count = CASE  
        WHEN NEW.created_at IS NOT NULL 
        THEN like_count + 1 
        ELSE like_count - 1 
        END 
    WHERE id = NEW.comment_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER increment_friend_request_count_on_insert
AFTER INSERT ON friendship
FOR EACH ROW
BEGIN
    UPDATE user_profile
    SET friend_request_count = friend_request_count + 1
    WHERE id = NEW.profile_responder_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER decrement_friend_request_count_on_update
AFTER UPDATE ON friendship
FOR EACH ROW
BEGIN
    UPDATE user_profile
    SET friend_request_count = friend_request_count - 1
    WHERE id = NEW.profile_responder_id;
END;
$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER decrement_friend_request_count_on_delete
AFTER DELETE ON friendship
FOR EACH ROW
BEGIN
  IF(OLD.status_id = 2) THEN
    UPDATE user_profile
    SET friend_request_count = friend_request_count - 1
    WHERE id = OLD.profile_responder_id;
  END IF;
END;
$$

DELIMITER ;


