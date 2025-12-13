const pool = require('../config/database')
const posts = `
CREATE TABLE IF NOT EXISTS posts(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_id INT UNSIGNED UNIQUE NOT NULL,
title NVARCHAR(255) NOT NULL,
slug VARCHAR(255) NOT NULL,
content LONGTEXT NOT NULL,
excerpt VARCHAR(100),
thumbnail VARCHAR(255),
publish TINYINT(1) NOT NULL DEFAULT 2,
published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;
pool.query(posts, (err) => {
    if (err) throw err;
    console.log('create posts table successfully!')
});
const posts_has_categories = `
CREATE TABLE IF NOT EXISTS posts_has_categories(
post_id INT UNSIGNED NOT NULL,
category_id INT UNSIGNED NOT NULL,
PRIMARY KEY (category_id,post_id),
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
)`
pool.query(posts_has_categories, (err) => {
    if (err) throw err;
    console.log('create posts_has_categories table successfully!')
});