const pool = require('../config/database');
const users = `CREATE TABLE IF NOT EXISTS users(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name NVARCHAR(20) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phone VARCHAR(10) UNIQUE,
gender VARCHAR(20),
status INT DEFAULT(1),
avatar LONGTEXT,
role_id INT DEFAULT (2) NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
pool.query(users, (err) => {
    if (err) throw err;
    console.log('add data success')
});