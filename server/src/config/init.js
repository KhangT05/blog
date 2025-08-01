const pool = require('./database');
const users = `CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
name NVARCHAR(20) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
phone VARCHAR(10),
gender VARCHAR(3),
status NVARCHAR(10),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
const roles = `CREATE TABLE IF NOT EXISTS roles (
id INT AUTO_INCREMENT PRIMARY KEY,
name NVARCHAR(50) NOT NULL,
guard_name VARCHAR(10),
description NVARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
const permissions = `CREATE TABLE IF NOT EXISTS permissions (
id INT AUTO_INCREMENT PRIMARY KEY,
name NVARCHAR(50) NOT NULL,
guard_name VARCHAR(10),
description NVARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`
const roles_has_permissions = `CREATE TABLE IF NOT EXISTS roles_has_permissions (
role_id INT NOT NULL,
permission_id INT NOT NULL,
PRIMARY KEY(role_id,permission_id),
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
)`
// pool.query(users, (err) => {
//     if (err) throw err;
//     console.log('create table success')
// });
const addFidldTableUsers = `ALTER TABLE users
ADD COLUMN refresh_token LONGTEXT NOT NULL`
pool.query(addFidldTableUsers, (err) => {
    if (err) throw err;
    console.log('add field success')
});