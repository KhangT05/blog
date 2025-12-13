const pool = require('../config/database');
const categories = `
CREATE TABLE IF NOT EXISTS categories(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name NVARCHAR(30) NOT NULL,
slug VARCHAR(255) NOT NULL,
description NVARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`

pool.query(categories, (err) => {
    if (err) throw err;
    console.log('create category table successfully!')
});
