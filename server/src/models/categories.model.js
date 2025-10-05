const pool = require('../config/database');
const category = `
CREATE TABLE IF NOT EXISTS category(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name NVARCHAR(30) NOT NULL,
description NVARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
const posts_has_categories = `
CREATE TABLE IF NOT EXISTS posts_has_categories(
post_id INT UNSIGNED NOT NULL,
category_id INT UNSIGNED NOT NULL,
PRIMARY KEY (category_id,post_id),
FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
)`
pool.query(category, (err) => {
    if (err) throw err;
    console.log('add data success')
});