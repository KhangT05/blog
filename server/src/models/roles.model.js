const pool = require('../config/database');
const roles = `CREATE TABLE IF NOT EXISTS roles(
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(30) NOT NULL,
status INT DEFAULT(1),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;
pool.query(roles, (err) => {
    if (err) throw err;
    console.log('create table role successfully!')
});